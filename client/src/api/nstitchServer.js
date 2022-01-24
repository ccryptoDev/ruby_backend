const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://app.sequincard.com"
    : "http://localhost:3001";

export const directLogin = async ({
  email,
  first_name,
  last_name,
  password,
  token
}) => {
  const response = await fetch(`${BASE_URL}/direct_login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      first_name,
      last_name,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  console.log("json resp:", jsonResponse)
  return jsonResponse;
};

export const directNewUser = async ({
  dToken,
  userId,
  token
}) => {
  const response = await fetch(`${BASE_URL}/direct_preauth_token`, {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      token: dToken
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  console.log("json resp:", jsonResponse)
  return jsonResponse;
};

export const directUserRegister = async ({
  email,
  first_name,
  last_name,
  password,
  dToken,
  token
}) => {
  const response = await fetch(`${BASE_URL}/direct_user_register`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      first_name,
      last_name,
      token: dToken
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  console.log("json resp:", jsonResponse)
  return jsonResponse;
};



export const directChangeEmail = async ({
  email,
  token
}) => {
  const response = await fetch(`${BASE_URL}/direct_change_email`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  console.log("json resp:", jsonResponse)
  return jsonResponse;
}

export const directChangePhone = async ({
  phone_number,
  token
}) => {
  const response = await fetch(`${BASE_URL}/direct_change_email`, {
    method: "POST",
    body: JSON.stringify({
      phone_number,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  console.log("json resp:", jsonResponse)
  return jsonResponse;
}

export const directCloseAccount = async ({
  email,
  first_name,
  last_name,
  password,
  token
}) => {
  const response = await fetch(`${BASE_URL}/direct_close_account`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      first_name,
      last_name,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await response.json();
  console.log("json resp:", jsonResponse)
  return jsonResponse;
};