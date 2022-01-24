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
          className={`sidenav-inner d-flex align-items-center ${
            this.props.orientation !== "horizontal" ? "py-1" : ""
          }`}
        >
          <Sidenav.Block>
            <div className="logoWrapper">
              <Logo color="white" />
            </div>
          </Sidenav.Block>
          <Sidenav.Divider />
          <Sidenav.RouterLink to="/home" exact={true}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 20.9133V8.44266C1 8.33387 1.05206 8.23164 1.14004 8.16765L11.0016 0.99562C11.1208 0.9089 11.2824 0.908901 11.4016 0.99562L21.2631 8.16765C21.3511 8.23164 21.4032 8.33387 21.4032 8.44266V20.9133C21.4032 21.1011 21.2509 21.2533 21.0631 21.2533H14.7296C14.5418 21.2533 14.3896 21.1011 14.3896 20.9133V14.7923C14.3896 14.6045 14.2373 14.4523 14.0495 14.4523H8.35365C8.16584 14.4523 8.01359 14.6045 8.01359 14.7923V20.9133C8.01359 21.1011 7.86135 21.2533 7.67354 21.2533H1.34005C1.15225 21.2533 1 21.1011 1 20.9133Z"
                stroke="#FF6C4B"
                strokeWidth="1.70027"
              />
            </svg>
            <span className="iconText">Home</span>
          </Sidenav.RouterLink>
          {/* <Sidenav.RouterLink to="/settings" exact={true} icon="fas fa-cog">
            Settings
          </Sidenav.RouterLink> */}
          <Sidenav.RouterLink to="/login" exact={true}>
            <div onClick={this.props.onLogout}>
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25091 1.90227H4.08089V2.07229V6.01934C4.08089 6.42944 3.75016 6.76017 3.34006 6.76017C2.92995 6.76017 2.59923 6.42944 2.59923 6.01934V1.16144C2.59923 0.751332 2.92995 0.420606 3.34006 0.420606H20.3427C20.7528 0.420606 21.0835 0.751332 21.0835 1.16144V18.1641C21.0835 18.5742 20.7528 18.9049 20.3427 18.9049H3.34006C2.92995 18.9049 2.59923 18.5742 2.59923 18.1641V13.3062C2.59923 12.8961 2.92995 12.5654 3.34006 12.5654C3.75016 12.5654 4.08089 12.8961 4.08089 13.3062V17.2532V17.4233H4.25091H19.4318H19.6019V17.2532V2.07229V1.90227H19.4318H4.25091Z"
                  fill="white"
                  stroke="#1E2A46"
                  strokeWidth="0.340053"
                />
                <path
                  d="M7.33421 10.6938L7.62446 10.4036H7.21398H0.910856C0.500752 10.4036 0.170026 10.0729 0.170026 9.66277C0.170026 9.25337 0.500282 8.92134 0.911927 8.91586H7.20791H7.61839L7.32814 8.62561L6.45371 7.75119L6.45372 7.75118L6.45268 7.75016C6.16276 7.46516 6.16127 6.99674 6.45371 6.7043L6.45474 6.70327C6.73974 6.41334 7.20816 6.41185 7.5006 6.7043L9.92955 9.13325C9.98992 9.19361 10.0392 9.27076 10.0749 9.35155C10.0774 9.35812 10.0799 9.36606 10.0843 9.38068L10.0848 9.38253C10.0887 9.39556 10.0945 9.4147 10.1023 9.43502C10.1202 9.48997 10.1301 9.54731 10.1353 9.61508L10.1361 9.62532L10.1381 9.63539C10.1403 9.64657 10.1409 9.66013 10.1409 9.69313C10.1409 9.7684 10.1269 9.84336 10.0992 9.91335L10.0801 9.93239V9.97311C10.0481 10.0408 10.0045 10.1007 9.94913 10.1607L9.93278 10.1785L9.92219 10.1996L7.50668 12.6152C7.36354 12.7583 7.17044 12.8325 6.98323 12.8325C6.79603 12.8325 6.60292 12.7583 6.45979 12.6152L6.45876 12.6141C6.16883 12.3291 6.16734 11.8607 6.45979 11.5683L7.33421 10.6938Z"
                  fill="white"
                  stroke="#1E2A46"
                  strokeWidth="0.340053"
                />
              </svg>
              <span className="iconText">Logout</span>
            </div>
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
