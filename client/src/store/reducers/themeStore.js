const getSettings = () => ({
  // Layout navbar color
  navbarBg: "navbar-theme",

  // Layout sidenav color
  sidenavBg: "sidenav-theme",

  // Layout footer color
  footerBg: "footer-theme",
});

const initialState = getSettings();

export default function (state = initialState, action) {
  return state;
}
