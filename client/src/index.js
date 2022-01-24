import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Popper from "popper.js";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";
import LogRocket from 'logrocket';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import amplitude from 'amplitude-js';

if (process.env.NODE_ENV === "production") {
  amplitude.getInstance().init("ed668f335761294402cc98e116f3cf6a");

  LogRocket.init('ouxwml/sequin');
  Sentry.init({
    dsn: "https://e9c0a7b6b02f4d2b8e973dfa3dcaa5ca@o507651.ingest.sentry.io/5599054",
    autoSessionTracking: true,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    environment: process.env.NODE_ENV,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });  
} else {
  amplitude.getInstance().init("ae8b8e53d0aa17ee9988e8ee676d35be");
}

// Required to enable animations on dropdowns/tooltips/popovers
Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false;

const store = configureStore(window.__INITIAL_STATE__);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
