import { combineReducers } from "redux";

import plaid, { DEFAULT_STATE as PLAID_DEFAULT_STATE } from "./plaid";
import user, { DEFAULT_STATE as USER_DEFAULT_STATE } from "./user";
import nstitch, { DEFAULT_STATE as NSTITCH_DEFAULT_STATE } from "./nstitch";
import efxApi, { DEFAULT_STATE as EFXAPI_DEFAULT_STATE } from "./efxApi";
import theme from "./themeStore";

export const DEFAULT_STATE = {
  plaid: PLAID_DEFAULT_STATE,
  user: USER_DEFAULT_STATE,
  nstitch: NSTITCH_DEFAULT_STATE,
  efxApi: EFXAPI_DEFAULT_STATE
};

export default combineReducers({
  plaid,
  theme,
  user,
  nstitch,
  efxApi
});
