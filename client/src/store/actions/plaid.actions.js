import api from "../../api";

export const PLAID_GET_LINK_TOKEN = "PLAID_GET_LINK_TOKEN";
export const PLAID_GET_ACCESS_TOKEN = "PLAID_GET_ACCESS_TOKEN";

export function getPlaidLinkToken({ token, userId }) {
  return {
    type: PLAID_GET_LINK_TOKEN,
    payload: api.plaid.getLinkToken({
      token,
      userId,
    }),
  };
}

export function getAccessToken({ plaidAuthId, publicToken, token }) {
  return {
    type: PLAID_GET_ACCESS_TOKEN,
    payload: api.plaid.getAccessToken({
      plaidAuthId,
      publicToken,
      token,
    }),
  };
}
