import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import Clock from "../gridItems/Clock";
import Weather from "../gridItems/Weather";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const layout = [];

class Page extends Component {
  static defaultProps = {
    className: "layout",
    isDraggable: false,
    isResizable: false,
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    autoSize: true
  };

  constructor(props) {
    super(props);
    this.state = {
      validCompany: false,
      validDashboard: false,
      validMatch: false,
      loaded: false,
      company: {
        id: "",
        name: "",
        handle: this.props.match.params.company
      },
      dashboard: {
        company_id: "",
        id: "",
        name: "",
        handle: this.props.match.params.dashboard,
        content: ""
      },
      items: layout.map(function(i, key, list) {
        return {
          i: layout[key].i,
          x: layout[key].x,
          y: layout[key].y,
          w: layout[key].w,
          h: layout[key].h,
          widget: layout[key].widget,
          minW: layout[key].minW,
          minH: layout[key].minH,
          maxH: layout[key].maxH
        };
      })
    };

    if (!this.state.loaded) {
      axios.get(`/api/company/all`).then(res => {
        const companies = res.data;
        axios.get(`/api/dashboard/all`).then(res => {
          const dashboards = res.data;

          Object.entries(companies).forEach(([key, value]) => {
            if (value.handle === this.state.company.handle) {
              this.setState({
                validCompany: true,
                company: {
                  id: value._id,
                  name: value.name,
                  handle: value.handle
                }
              });
            }
          });

          Object.entries(dashboards).forEach(([key, value]) => {
            if (value.handle === this.state.dashboard.handle) {
              if (value.content.length > 0) {
                var items = JSON.parse(value.content);
                for (var i = 0; i < items.length; i++) {
                  if (items[i].y === null) {
                    items[i].y = Infinity;
                  }
                }
                this.setState({
                  items
                });
              }
              this.setState({
                validDashboard: true,
                dashboard: {
                  company_id: value.company,
                  id: value._id,
                  name: value.name,
                  handle: value.handle,
                  content: value.content
                }
              });
            }
          });

          if (this.state.dashboard.company_id === this.state.company.id) {
            document.title = `${this.state.dashboard.name} – ${
              this.state.company.name
            } | Laméco Dashboard`;
            this.setState({ validMatch: true, loaded: true });
          } else {
            document.title = "No dashboard found | Laméco Dashboard";
            this.setState({
              loaded: true
            });
          }
        });
      });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      axios.get(`/api/dashboard/${this.state.dashboard.id}`).then(res => {
        if (res.data.content.length > 0) {
          var items = JSON.parse(res.data.content);
          for (var i = 0; i < items.length; i++) {
            if (items[i].y === null) {
              items[i].y = Infinity;
            }
          }
          this.setState({
            items
          });
        }
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createElement = el => {
    const i = el.i;
    const widget = el.widget;

    return (
      <div key={i} data-grid={el}>
        {(() => {
          switch (widget) {
            case "Clock":
              return <Clock />;
            case "Photo":
              return <div className="photo" />;
            case "Weather":
              return <Weather />;
            default:
              return <div className="textWidget">{widget}</div>;
          }
        })()}
      </div>
    );
  };

  onBreakPointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  };

  onLayoutChange = layout => {
    this.setState({
      layout
    });
  };

  render() {
    const {
      dashboard,
      company,
      loaded,
      validMatch,
      items,
      layout
    } = this.state;
    const els = _.map(items, el => this.createElement(el));

    let dashboardContent;
    if (loaded) {
      if (dashboard.content && dashboard.name && validMatch) {
        dashboardContent = (
          <ResponsiveReactGridLayout
            layout={layout}
            onLayoutChange={this.onLayoutChange}
            onBreakPointChange={this.onBreakPointChange}
            {...this.props}
          >
            {els}
          </ResponsiveReactGridLayout>
        );
      } else if (!dashboard.content && dashboard.name && validMatch) {
        dashboardContent = (
          <div className="flex-center-center max-width-height">
            <p>This dashboard has no content</p>
          </div>
        );
      } else {
        dashboardContent = (
          <div className="flex-center-center max-width-height">
            <p>
              No dashboard found with the URL: /{company.handle}/
              {dashboard.handle}
            </p>
          </div>
        );
      }
    } else {
      dashboardContent = (
        <div className="flex-center-center max-width-height">
          <p>Loading...</p>
        </div>
      );
    }

    return <div className="page">{dashboardContent}</div>;
  }
}

export default Page;
