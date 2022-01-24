import React, { Component } from "react";
import LayoutSidenav from "./NLayoutSidenav";
import layoutHelpers from "./helpers";

class Layout1 extends Component {
  closeSidenav(e) {
    e.preventDefault();
    layoutHelpers.setCollapsed(true);
  }

  componentDidMount() {
    layoutHelpers.init();
    layoutHelpers.update();
    layoutHelpers.setAutoUpdate(true);
  }

  componentWillUnmount() {
    layoutHelpers.destroy();
  }

  render() {
    return (
      <div className="layout-wrapper layout-1">
        <div className="layout-inner">
          <div className="layout-container">
            <LayoutSidenav {...this.props} />

            <div className="layout-content">
              <div className="container-fluid flex-grow-1 container-p-y">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <div className="layout-overlay" onClick={this.closeSidenav}></div>
      </div>
    );
  }
}

export default Layout1;
