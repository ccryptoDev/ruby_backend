const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://app.sequincard.com"
    : "http://localhost:3001";

export const autoLogin = async ({ token }) => {
  const response = await fetch(`${BASE_URL}/auto_login`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const register = async ({
  email,
  first_name,
  last_name,
  password,
  phone_number,
}) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    body: JSON.stringify({
      email,
      first_name,
      last_name,
      password,
      phone_number,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  // console.log("json resp:", jsonResponse)
  return jsonResponse;
};

export const resetPasswordCreate = async ({ email }) => {
  const response = await fetch(`${BASE_URL}/password_resets`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const resetPasswordUpdate = async ({
  password,
  confirmPassword,
  digest,
}) => {
  const response = await fetch(`${BASE_URL}/password_resets/${digest}`, {
    method: "PATCH",
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const getFinancials = async ({ token, userId }) => {
  const response = await fetch(`${BASE_URL}/financials/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const saveCreditScore = async ({ token, score }) => {
  const response = await fetch(`${BASE_URL}/credit_score`, {
    method: "POST",
    body: JSON.stringify({ score }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const updateDefaultAccountId = async ({ token, accountId }) => {
  const response = await fetch(`${BASE_URL}/users/default_account_id`, {
    method: "POST",
    body: JSON.stringify({ accountId }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const saveReferral = async ({ token, email }) => {
  const response = await fetch(`${BASE_URL}/invites`, {
    method: "POST",
    body: JSON.stringify({ email }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const enableAlerts = async ({ token }) => {
  const response = await fetch(`${BASE_URL}/users/alerts/enable`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const disableAlerts = async ({ token }) => {
  const response = await fetch(`${BASE_URL}/users/alerts/disable`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
};

export const getCreditScores = async ({ token, userId }) => {
  const response = await fetch(`${BASE_URL}/credit_score/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const refreshFinancials = async ({ token, userId }) => {
  const response = await fetch(`${BASE_URL}/financials/refresh`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const refreshFinancialsDelay = async ({ token, userId, delay }) => {
  const response = await fetch(`${BASE_URL}/financials/refresh/${delay}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
