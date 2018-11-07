import React, { Component } from "react";
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import TitleBar from "../bars/TitleBar";
import Clock from "../gridItems/Clock";
import Weather from "../gridItems/Weather";
import WidgetSelecter from "./WidgetSelecter";
import EditDashboardTitle from "./EditDashboardTitle";
import BackButton from "./Backbutton";
import Loader from "../common/Loader";
import { deleteDashboard } from "../../actions/companyActions";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const layout = [];

/* This class generates the layout for the web app. It renders the grid
 * and it's items, but also the side navigation with button's and a dropdown menu, to control the grid.
 */
class DashboardEdit extends Component {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
    autoSize: true
  };

  constructor(props) {
    super(props);

    this.state = {
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
      }),
      selectedOption: { value: "", label: "Select a widget" },
      dashboard: {
        valid: false,
        company_id: "",
        id: "",
        handle: this.props.match.params.handle,
        name: ""
      },
      company: {
        id: "",
        handle: "",
        name: ""
      },
      name: "",
      handle: this.props.match.params.handle,
      inputNameActive: false,
      inputHandleActive: false,
      loaded: false
    };

    if (!this.state.loaded) {
      axios.get(`/api/company/all`).then(res => {
        const companies = res.data;
        axios.get(`/api/dashboard/all`).then(res => {
          const dashboards = res.data;

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
                dashboard: {
                  valid: true,
                  company_id: value.company,
                  id: value._id,
                  handle: value.handle,
                  name: value.name
                },
                name: value.name,
                handle: value.handle,
                loaded: true
              });

              document.title = `${
                this.state.dashboard.name
              } | Laméco Dashboard`;
            }
          });

          if (this.state.dashboard.valid) {
            Object.entries(companies).forEach(([key, value]) => {
              if (value._id === this.state.dashboard.company_id) {
                this.setState({
                  company: {
                    id: value._id,
                    handle: value.handle,
                    name: value.name
                  }
                });
              }
            });
          } else {
            // Not a valid handle -> Show error?
            this.props.history.push("/");
          }
        });
      });
    }
  }

  /* This function renders all grid items in the layout array. It creates a div
	 * with a remove button, and content. The content managed by a switch statement,
	 * which output is based on the widget property from the grid items.
	 */
  createElement = el => {
    const removeStyle = {
      position: "absolute",
      right: 10,
      top: 5,
      cursor: "pointer"
    };
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
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  };

  /* The onAddItem() function is called when the user clicks on the 'Add Item' button.
	 * It adds a new grid item to the state, and takes the selected item in the dropmenu
	 * into account. This way the correct widget is loaded by the createElement() function.
	 */
  onAddItem = () => {
    var selection = this.state.selectedOption
      ? this.state.selectedOption
      : false;

    if (this.state.selectedOption.value !== "") {
      var widgetProps = returnProps(selection.value);

      var identifier = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 10; i++)
        identifier += possible.charAt(
          Math.floor(Math.random() * possible.length)
        );

      this.setState({
        items: this.state.items.concat({
          i: identifier,
          x: (this.state.items.length * 2) % (this.state.cols || 12),
          y: Infinity,
          w: widgetProps.w,
          h: widgetProps.h,
          widget: selection ? selection.value : "",
          minW: widgetProps.minW,
          minH: widgetProps.minH,
          maxH: widgetProps.maxH
        }),
        selectedOption: { value: "", label: "Select a widget" }
      });
    }
  };

  /* onLayoutReset() is called when the user clicks on the 'Reset Layout' button.
	 * It clears the localStorage and then issues a window refresh.
	 */
  onLayoutReset = () => {
    // remove content from grid && database
    saveToDB(this.state.items, this.state.dashboard.handle, true);
    this.setState({
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
    });
  };

  /* Calls back with breakpoint and new # cols */
  onBreakPointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  };

  /* Is called whenever the layout is changed. The for loop adds widget attribute
	 * from items array to objects in layout array, so that the widget props
	 * are also saved to localStorage. This is because objects in the layout array
	 * do not include a widget property by default.
	 */
  onLayoutChange = layout => {
    this.setState({ layout: layout });
    for (var i = 0; i < this.state.items.length; i++) {
      layout[i].widget = this.state.items[i].widget;
    }
    saveToDB(layout, this.state.dashboard.handle, false);
  };

  /* When a user presses the little 'x' in the top right corner of a grid item,
	 * this function is called. It removes the corresponding grid item.
	 */
  onRemoveItem = i => {
    this.setState({ items: _.reject(this.state.items, { i: i }) });
    if (this.state.items.length === 1) {
      saveToDB(this.state.items, this.state.dashboard.handle, true);
    }
  };

  /* handleChange passes the selected dropdown item to the state. */
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeFocusNameIcon = () => {
    if (!this.state.inputNameActive) {
      document.getElementById("dashboardNinput").blur();
      document.getElementById("dashboardNicon").textContent = "edit";
      this.setState({ inputNameActive: false });
    } else {
      document.getElementById("dashboardNinput").focus();
      document.getElementById("dashboardNicon").textContent = "check";
      this.setState({ inputNameActive: true });
    }
  };

  onFocus = () => {
    document.getElementById("dashboardNicon").textContent = "check";
    this.setState({ inputNameActive: true });
  };

  onBlur = e => {
    const target = e.target.name;
    var value = e.target.value;

    if (target === "name") {
      value = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map(x => x.charAt(0).toUpperCase() + x.substring(1))
        .join(" ");

      document.getElementById("dashboardNicon").textContent = "edit";
      this.setState({ [target]: value, inputNameActive: false });

      saveDashboardToDB({
        id: this.state.dashboard.id,
        name: this.state.name,
        handle: this.state.handle,
        company: this.state.dashboard.company_id
      });

      document.title = `${value} | Laméco Dashboard`;
    } else if (target === "handle") {
      value = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      document.getElementById("dashboardHicon").textContent = "edit";
      this.setState({ [target]: value, inputHandleActive: false });

      const { dashboard, name, handle } = this.state;

      saveDashboardToDB({
        id: dashboard.id,
        name: name,
        handle: handle,
        company: dashboard.company_id
      });

      this.props.history.push(`/dashboard-edit/${value}`);
    }
  };

  onChangeFocusHandle = () => {
    if (!this.state.inputHandleActive) {
      document.getElementById("dashboardHinput").focus();
      document.getElementById("dashboardHicon").textContent = "check";

      this.setState({ inputHandleActive: true });
    } else if (this.state.inputHandleActive) {
      document.getElementById("dashboardHinput").blur();
      document.getElementById("dashboardHicon").textContent = "edit";

      this.setState({ inputHandleActive: false });
    }
  };

  onDashboardDelete = () => {
    this.props.deleteDashboard(this.state.dashboard.id);
    this.props.history.push("/");
  };

  /* This render function, renders the grid, dropdown-menu, 'Add Item'-button
	 * and 'Reset Layout'-button. This is also where the createElement() function
	 * is called for each grid item.
	 */
  render() {
    const { selectedOption, items, loaded, company, name, handle } = this.state;

    let grid;
    if (!loaded) {
      grid = (
        <div className="loader-center">
          <Loader />
        </div>
      );
    } else {
      if (items.length > 0) {
        grid = (
          <ResponsiveReactGridLayout
            onLayoutChange={this.onLayoutChange}
            onBreakPointChange={this.onBreakPointChange}
            {...this.props}
          >
            {_.map(items, el => this.createElement(el))}
          </ResponsiveReactGridLayout>
        );
      } else {
        grid = <div className="noItems">No widgets on the dashboard yet.</div>;
      }
    }

    return (
      <div className="dashboardEdit">
        <TitleBar />
        <div className="mainContainer">
          <div className="sideNav shadow2">
            <BackButton history={this.props.history} />
            <EditDashboardTitle
              onChange={this.onChange}
              onNameInput={this.onNameInput}
              onChangeFocusNameIcon={this.onChangeFocusNameIcon}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              company={company}
              name={name}
              handle={handle}
            />
            <WidgetSelecter
              selectedOption={selectedOption}
              handleChange={this.handleChange}
              onAddItem={this.onAddItem}
              onLayoutReset={this.onLayoutReset}
              onDashboardDelete={this.onDashboardDelete}
            />
          </div>
          <div className="dashboardGrid">
            {/* Grid with widgets */}
            {grid}
          </div>
        </div>
      </div>
    );
  }
}
/* Save layout to database. */
function saveToDB(content, handle, reset) {
  if (content.length <= 0) {
    content = "";
  } else if (reset) {
    content = "";
  } else {
    content = JSON.stringify(content);
  }

  axios.post(`/api/dashboard/update/layout/${handle}`, {
    content
  });
}

function saveDashboardToDB(dashboard) {
  axios.post(`/api/dashboard/update/${dashboard.id}`, dashboard);
}

/* returnProps function returns widget-specific properties like width, min width,
 * heigth, etc.
 */
function returnProps(selection) {
  switch (selection) {
    case "Clock":
      return {
        w: 1.5,
        h: 1,
        minW: 1.5,
        minH: 1,
        maxH: 1000
      };
    case "Weather":
      return {
        w: 3,
        h: 3,
        minW: 3,
        minH: 3,
        maxH: 3
      };
    default:
      return {
        w: 2,
        h: 2,
        minW: 1,
        minH: 1,
        maxH: 1000
      };
  }
}

DashboardEdit.propTypes = {
  deleteDashboard: PropTypes.func.isRequired
};
export default connect(
  null,
  { deleteDashboard }
)(DashboardEdit);
