import React from "react";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import Loader from "./shared/components/Loader";

// Layouts
import Layout1 from "./shared/layouts/Layout1";
// import Layout1Flex from './shared/layouts/Layout1Flex'
// import Layout2 from './shared/layouts/Layout2'
// import Layout2Flex from './shared/layouts/Layout2Flex'
// import LayoutHorizontalSidenav from './shared/layouts/LayoutHorizontalSidenav'
// import LayoutWithoutSidenav from './shared/layouts/LayoutWithoutSidenav'
// import LayoutWithoutNavbar from './shared/layouts/LayoutWithoutNavbar'
// import LayoutWithoutNavbarFlex from './shared/layouts/LayoutWithoutNavbarFlex'

// Lazy load component
const lazy = (cb) =>
  loadable(() => pMinDelay(cb(), 200), { fallback: <Loader /> });

// ---
// Default application layout

export const DefaultLayout = Layout1;

// ---
// Routes
//
// Note: By default all routes use { "exact": true }. To change this
// behaviour, pass "exact" option explicitly to the route object

export const defaultRoute = "/";
export const publicRoutes = [
  {
    path: "/",
    component: lazy(() => import("./features/Login/LoginController")),
  },
  {
    path: "/login",
    component: lazy(() => import("./features/Login/LoginController")),
  },
  {
    path: "/register",
    component: lazy(() => import("./features/Register/RegisterController")),
  },
  {
    path: "/password_resets/new",
    component: lazy(() =>
      import("./features/ResetPassword/ResetPasswordController"),
    ),
  },
  {
    path: "/password_resets/:digest/edit",
    component: lazy(() =>
      import("./features/ResetPassword/UpdatePasswordController"),
    ),
  }
];

export const privateRoutes = [
  {
    path: "/home",
    component: lazy(() => import("./features/Home/NHomeController")),
  },
  {
    path: "/settings",
    component: lazy(() => import("./features/Settings/SettingsController")),
  },
];
