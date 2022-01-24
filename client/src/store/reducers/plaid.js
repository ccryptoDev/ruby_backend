import {
  PLAID_GET_ACCESS_TOKEN,
  PLAID_GET_LINK_TOKEN,
} from "../actions/plaid.actions";

export const DEFAULT_STATE = {
  authId: undefined,
  error: undefined,
  isLoading: false,
  linkToken: undefined,
};

const plaidReducer = (state = DEFAULT_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case `${PLAID_GET_LINK_TOKEN}_REQ`:
      return {
        authId: undefined,
        error: undefined,
        isLoading: true,
        linkToken: undefined,
      };
    case `${PLAID_GET_LINK_TOKEN}_ACK`:
      return {
        authId: payload.id,
        error: payload.message,
        isLoading: false,
        linkToken: payload.link_token,
      };
    case `${PLAID_GET_LINK_TOKEN}_ERR`:
      return {
        authId: undefined,
        error: payload, // TODO talk to backend as backend is giving us errors with successful hits
        isLoading: false,
        linkToken: undefined,
      };
    case `${PLAID_GET_ACCESS_TOKEN}_REQ`:
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case `${PLAID_GET_ACCESS_TOKEN}_ACK`:
      return {
        ...state,
        error: payload.message,
        isLoading: false,
      };
    case `${PLAID_GET_ACCESS_TOKEN}_ERR`:
      return {
        ...state,
        error: payload, // TODO
        isLoading: false,
      };

    default:
      return state;
  }
};

export default plaidReducer;
