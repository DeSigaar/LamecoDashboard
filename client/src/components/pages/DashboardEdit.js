import React, { Component } from "react";
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import axios from "axios";
import TitleBar from "../bars/TitleBar";
import Clock from "../gridItems/Clock";
import Weather from "../gridItems/Weather";
import DashboardEditSideNav from "../bars/DashboardEditSideNav";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || [];

/* This class generates the layout for the web app. It renders the grid
 * and it's items, but also button's and a dropdown menu, to control the grid.
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
      items: originalLayouts.map(function(i, key, list) {
        return {
          i: originalLayouts[key].i,
          x: originalLayouts[key].x,
          y: originalLayouts[key].y,
          w: originalLayouts[key].w,
          h: originalLayouts[key].h,
          widget: originalLayouts[key].widget,
          minW: originalLayouts[key].minW,
          minH: originalLayouts[key].minH,
          maxH: originalLayouts[key].maxH
        };
      }),
      selectedOption: { value: "", label: "Select..." },
      newCounter: originalLayouts.length,
      dashboard: {
        id: "",
        handle: this.props.match.params.handle,
        name: "",
        content: ""
      },
      loaded: false
    };

    if (!this.state.loaded) {
      axios
        .get(`/api/dashboard/handle/${this.state.dashboard.handle}`)
        .then(res => {
          this.setState({
            dashboard: {
              id: res.data._id,
              handle: res.data.handle,
              name: res.data.name,
              content: res.data.content
            },
            loaded: true
          });

          document.title = `${this.state.dashboard.name} | Laméco Dashboard`;
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
      right: 2,
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
    const widget = el.widget;

    saveToDB(this.state.items, this.state.dashboard.handle);

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
              return <span>{widget}</span>;
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
      this.setState({
        items: this.state.items.concat({
          i: "n" + this.state.newCounter,
          x: (this.state.items.length * 2) % (this.state.cols || 12),
          y: Infinity,
          w: widgetProps.w,
          h: widgetProps.h,
          widget: selection ? selection.value : "",
          minW: widgetProps.minW,
          minH: widgetProps.minH,
          maxH: widgetProps.maxH
        }),
        selectedOption: { value: "", label: "Select..." },
        newCounter: this.state.newCounter + 1
      });
      saveToDB(this.state.items, this.state.dashboard.handle);
    }
  };

  /* onLayoutReset() is called when the user clicks on the 'Reset Layout' button.
	 * It clears the localStorage and then issues a window refresh.
	 */
  onLayoutReset = () => {
    // remove content from grid && database
    localStorage.removeItem("rgl-8");
    window.location.reload();
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
    saveToDB(this.state.items, this.state.dashboard.handle);
    saveToLS("layouts", layout);
  };

  /* When a user presses the little 'x' in the top right corner of a grid item,
	 * this function is called. It removes the corresponding grid item.
	 */
  onRemoveItem = i => {
    this.setState({ items: _.reject(this.state.items, { i: i }) });
    saveToDB(this.state.items, this.state.dashboard.handle);
  };

  /* handleChange passes the selected dropdown item to the state. */
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  /* This render function, renders the grid, dropdown-menu, 'Add Item'-button
	 * and 'Reset Layout'-button. This is also where the createElement() function
	 * is called for each grid item.
	 */
  render() {
    const { selectedOption, items } = this.state;

    let grid;
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
      grid = (
        <div className="noItems">
          No widgets have been added to the dashboard yet.
        </div>
      );
    }

    return (
      <div className="dashboardEdit">
        <TitleBar />
        <div className="mainContainer">
          <div className="sideNav shadow2">
            <DashboardEditSideNav
              selectedOption={selectedOption}
              handleChange={this.handleChange}
              onAddItem={this.onAddItem}
              onLayoutReset={this.onLayoutReset}
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

/* Retrieve layout from local storage. */
function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      console.log(e);
    }
  }
  return ls[key];
}

/* Save layout to local storage. */
function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

/* Save layout to database. */
function saveToDB(content, handle) {
  content = JSON.stringify(content);
  axios
    .post(`/api/dashboard/layout/handle/${handle}`, {
      content
    })
    .then(res => {
      console.log(res);
    });
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

export default DashboardEdit;
