import React, { Component } from "react";
import _ from "lodash";
import { WidthProvider, Responsive } from "react-grid-layout";
import Select from "react-select";
import TitleBar from "../bars/TitleBar";
import Clock from "../gridItems/Clock";
import Weather from "../gridItems/Weather";

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
      selectedOption: "",
      newCounter: originalLayouts.length
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakPointChange = this.onBreakPointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onLayoutReset = this.onLayoutReset.bind(this);
  }

  /* This function renders all grid items in the layout array. It creates a div
	 * with a remove button, and content. The content managed by a switch statement,
	 * which output is based on the widget property from the grid items.
	 */
  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: 2,
      top: 0,
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
  }

  /* The onAddItem() function is called when the user clicks on the 'Add Item' button.
	 * It adds a new grid item to the state, and takes the selected item in the dropmenu
	 * into account. This way the correct widget is loaded by the createElement() function.
	 */
  onAddItem() {
    var selection = this.state.selectedOption ? this.state.selectedOption : 0;
    var widgetProps = returnProps(selection.value);

    if (selection) {
      console.log(
        "adding",
        "n" + this.state.newCounter + "; " + selection.value
      );
    } else {
      console.log("adding", "n" + this.state.newCounter + "; empty");
    }

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
      newCounter: this.state.newCounter + 1
    });
  }

  /* onLayoutReset() is called when the user clicks on the 'Reset Layout' button.
	 * It clears the localStorage and then issues a window refresh.
	 */
  onLayoutReset() {
    localStorage.removeItem("rgl-8");
    window.location.reload();
  }

  /* Calls back with breakpoint and new # cols */
  onBreakPointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  /* Is called whenever the layout is changed. The for loop adds widget attribute
	 * from items array to objects in layout array, so that the widget props
	 * are also saved to localStorage. This is because objects in the layout array
	 * do not include a widget property by default.
	 */
  onLayoutChange(layout) {
    this.setState({ layout: layout });
    for (var i = 0; i < this.state.items.length; i++) {
      layout[i].widget = this.state.items[i].widget;
    }
    saveToLS("layouts", layout);
  }

  /* When a user presses the little 'x' in the top right corner of a grid item,
	 * this function is called. It removes the corresponding grid item.
	 */
  onRemoveItem(i) {
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  /* handleChange passes the selected dropdown item to the state. */
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  };

  /* This render function, renders the grid, dropdown-menu, 'Add Item'-button
	 * and 'Reset Layout'-button. This is also where the createElement() function
	 * is called for each grid item.
	 */
  render() {
    const { selectedOption } = this.state;

    return (
      <div className="dashboardEdit">
        <TitleBar />
        <div className="mainContainer">
          <div className="sideNav shadow2">
            {/* Back button */}
            <div
              className="backButton"
              onClick={() => this.props.history.push("/")}
            >
              <button className="btn icon red">
                <i className="material-icons">arrow_back</i>
                <span>Back</span>
              </button>
            </div>
            {/* Dropdown menu for widgets */}
            <div className="widgetselecter">
              <Select
                className="dropdown"
                name="form-field-name"
                value={selectedOption}
                onChange={this.handleChange}
                options={[
                  { value: "One", label: "One" },
                  { value: "Clock", label: "Clock" },
                  { value: "Photo", label: "Photo" },
                  { value: "Weather", label: "Weather" }
                ]}
              />
              {/* Deleting everything from grid */}
              <div className="reset">
                <button className="btn" onClick={this.onLayoutReset}>
                  Reset Layout
                </button>
              </div>
            </div>
          </div>
          <div className="DashboardGrid">
            {/* Information about dashboard and button to add widget */}
            <div className="TopDashboard">
              <h3>Company name</h3>
              <button className="btn icon red" onClick={this.onAddItem}>
                <i className="material-icons">add</i>
                <span>Add widget</span>
              </button>
            </div>
            {/* Grid with widgets */}
            <div className="BottomDashboard">
              <ResponsiveReactGridLayout
                onLayoutChange={this.onLayoutChange}
                onBreakPointChange={this.onBreakPointChange}
                {...this.props}
              >
                {_.map(this.state.items, el => this.createElement(el))}
              </ResponsiveReactGridLayout>
            </div>
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
      /*Ignore*/
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
