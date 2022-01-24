import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidenav from "../../vendor/libs/sidenav";
import Logo from "../components/Logo";
import layoutHelpers from "./helpers";
import { logout } from "../../store/actions/user.actions";
import "./SequinLayout.scss";

class LayoutSidenav extends Component {
  layoutSidenavClasses() {
    let bg = this.props.sidenavBg;

    if (
      this.props.orientation === "horizontal" &&
      (bg.indexOf(" sidenav-dark") !== -1 ||
        bg.indexOf(" sidenav-light") !== -1)
    ) {
      bg = bg
        .replace(" sidenav-dark", "")
        .replace(" sidenav-light", "")
        .replace("-darker", "")
        .replace("-dark", "");
    }
    return (
      // `bg-${bg} ` +
      `sequinSideNav ` +
      (this.props.orientation !== "horizontal"
        ? "layout-sidenav"
        : "layout-sidenav-horizontal container-p-x flex-grow-0")
    );
  }

  toggleSidenav(e) {
    e.preventDefault();
    layoutHelpers.toggleCollapsed();
  }

  isMenuActive(url) {
    return this.props.location.pathname.indexOf(url) === 0;
  }

  isMenuOpen(url) {
    return (
      this.props.location.pathname.indexOf(url) === 0 &&
      this.props.orientation !== "horizontal"
    );
  }

  render() {
    return (
      <Sidenav
        orientation={this.props.orientation}
        className={this.layoutSidenavClasses()}
      >
        {/* Inner */}
        <div
          className={`sidenav-inner ${
            this.props.orientation !== "horizontal" ? "py-1" : ""
          }`}
        >
          <Sidenav.Block>
            <div className="logoWrapper">
              <Logo color="white" />
            </div>
          </Sidenav.Block>
          <Sidenav.Divider />
          <Sidenav.RouterLink to="/home" exact={true} icon="fas fa-home">
            Home
          </Sidenav.RouterLink>
          {/* <Sidenav.RouterLink to="/settings" exact={true} icon="fas fa-cog">
            Settings
          </Sidenav.RouterLink> */}
          <Sidenav.RouterLink
            to="/login"
            exact={true}
            icon="fas fa-sign-out-alt"
          >
            <div onClick={this.props.onLogout}>Logout</div>
          </Sidenav.RouterLink>
        </div>
      </Sidenav>
    );
  }
}

LayoutSidenav.propTypes = {
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
};

LayoutSidenav.defaultProps = {
  orientation: "vertical",
};

export default connect(
  (store) => ({
    sidenavBg: store.theme.sidenavBg,
  }),
  { onLogout: logout },
)(LayoutSidenav);
