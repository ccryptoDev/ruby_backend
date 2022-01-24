import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NotFound from "./components/NotFound";

// Routes
import {
  DefaultLayout,
  defaultRoute,
  publicRoutes,
  privateRoutes,
} from "../routes";
import { autoLogin } from "../store/actions/user.actions";
import LayoutBlank from "./layouts/LayoutBlank";
import amplitude from 'amplitude-js';

const mapStateToProps = (state) => ({
  isUserLoggedIn: !!state.user.details?.id,
});

function PublicRoute({ children, isUserLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return isUserLoggedIn ? <Redirect to="/home" /> : rest.render();
      }}
    />
  );
}

function PrivateRoute({ children, isUserLoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return isUserLoggedIn ? rest.render() : <Redirect to="/" />;
      }}
    />
  );
}

class Router extends Component {
  constructor(props) {
    super(props);

    // Set default layout
    this.publicRoutes = publicRoutes.map((route) => {
      route.layout = route.layout || LayoutBlank;
      route.exact = typeof route.exact === "undefined" ? true : route.exact;
      return route;
    });

    this.privateRoutes = privateRoutes.map((route) => {
      route.layout = route.layout || DefaultLayout;
      route.exact = typeof route.exact === "undefined" ? true : route.exact;
      return route;
    });

    // Set app loading class
    document.documentElement.classList.add("app-loading");
  }

  componentDidMount() {
    const token = window.localStorage.getItem("sequin_token");
    this.props.onAutoLogin({ token });

    const removeLoadingClass = () => {
      document.documentElement.classList.remove("app-loading");
    };

    // Remove splash screen
    const splashScreen = document.querySelector(".app-splash-screen");
    if (splashScreen) {
      splashScreen.style.opacity = 0;
      setTimeout(() => {
        if (splashScreen && splashScreen.parentNode) {
          splashScreen.parentNode.removeChild(splashScreen);
        }
        removeLoadingClass();
      }, 300);
    } else {
      removeLoadingClass();
    }
  }

  scrollTop(
    to,
    duration,
    element = document.scrollingElement || document.documentElement,
  ) {
    if (element.scrollTop === to) return;
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();

    if (!duration) {
      element.scrollTop = to;
      return;
    }

    // t = current time; b = start value; c = change in value; d = duration
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(
        easeInOutQuad(currentTime, start, change, duration),
      );
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
      }
    };

    animateScroll();
  }

  render() {
    return (
      <AppRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          {this.publicRoutes.map((route) => (
            <PublicRoute
              isUserLoggedIn={this.props.isUserLoggedIn}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                // Scroll page to top on route render
                this.scrollTop(0, 0);

                // Return layout
                return (
                  <route.layout {...props}>
                    <route.component {...props} scrollTop={this.scrollTop} />
                  </route.layout>
                );
              }}
              key={route.path}
            />
          ))}
          {this.privateRoutes.map((route) => (
            <PrivateRoute
              isUserLoggedIn={this.props.isUserLoggedIn}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                // On small screens collapse sidenav
                if (
                  window.layoutHelpers &&
                  window.layoutHelpers.isSmallScreen()
                ) {
                  window.layoutHelpers.setCollapsed(true, false);
                }

                // Scroll page to top on route render
                this.scrollTop(0, 0);

                // Return layout
                return (
                  <route.layout {...props}>
                    <route.component {...props} scrollTop={this.scrollTop} />
                  </route.layout>
                );
              }}
              key={route.path}
            />
          ))}
          {defaultRoute !== "/" && (
            <Redirect from="/" to={defaultRoute} exact={true} />
          )}
          {/* NotFound page */}
          <Route path="*" component={NotFound} />
        </Switch>
      </AppRouter>
    );
  }
}

export default connect(mapStateToProps, {
  onAutoLogin: autoLogin,
})(Router);
