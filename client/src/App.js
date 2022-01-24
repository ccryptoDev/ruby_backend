import React, { Component } from "react";
import Router from "./shared/Router";

import "./vendor/styles/bootstrap.scss";
import "./vendor/styles/appwork.scss";
import "./vendor/styles/theme-cotton.scss";
import "./vendor/styles/colors.scss";
import "./vendor/styles/uikit.scss";
import "./shared/assets/fonts/stylesheet.css";
class App extends Component {
  render() {
    return <Router />;
  }
}

export default App;
