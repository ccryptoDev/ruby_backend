import { BASE_URL } from "./constants";

export const getLinkToken = async ({ token, userId }) => {
  const response = await fetch(`${BASE_URL}/plaid/link_token`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const getAccessToken = async ({ plaidAuthId, publicToken, token }) => {
  const response = await fetch(
    `${BASE_URL}/plaid/public_token/${plaidAuthId}?public_token=${publicToken}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const jsonResponse = await response.json();
  return jsonResponse;
};
