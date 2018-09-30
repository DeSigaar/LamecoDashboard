import React, { Component } from "react";
import "./App.css";
import Grid from "./components/Grid.jsx";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Grid />
        </div>
      </Provider>
    );
  }
}

export default App;
