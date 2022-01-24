const BASE_URL = "https://efx-dev.stitchcredit.com/api/users";

export const preauthToken = async ({
  token,
  paToken
}) => {
  const response = await fetch(`${BASE_URL}/preauth-token/${paToken}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const identity = async ({
  dob,
  mobile,
  ssn,
  street1,
  street2,
  city,
  state,
  zip,
  country,
  uToken,
}) => {
  const response = await fetch(`${BASE_URL}/identity`, {
    method: "POST",
    body: JSON.stringify({
      dob,
      mobile,
      ssn,
      street1,
      street2,
      city,
      state,
      zip,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const getMobile = async ({
  uToken
}) => {
  const response = await fetch(`${BASE_URL}/get-mobile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const sendCode = async ({
  uToken,
  moToken
}) => {
  const response = await fetch(`${BASE_URL}/send-code/${moToken}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const verifyCode = async ({
  uToken,
  mTransactionKey,
  passcode
}) => {
  console.log('verify Code in nstitchApp &&&&&&&&&& ;', uToken, mTransactionKey, passcode);
  const response = await fetch(`${BASE_URL}/verify-code`, {
    method: "POST",
    body: JSON.stringify({
      key: mTransactionKey,
      code: passcode
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const renewCode = async ({
  uToken,
  mTransactionKey
}) => {
  const response = await fetch(`${BASE_URL}/renew-code`, {
    method: "POST",
    body: JSON.stringify({
      key: mTransactionKey
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export const getQuiz = async ({
  uToken,
}) => {
  const response = await fetch(`${BASE_URL}/get-quiz`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const verifyQuiz = async ({
  uToken,
  qTransactionKey,
  qzId,
}) => {
  const response = await fetch(`${BASE_URL}/verify-quiz`, {
    method: "POST",
    body: JSON.stringify({
      key: qTransactionKey,
      id: qzId,
      answers: [
        {"qid":1,"aid":3},
        {"qid":2,"aid":3},
        {"qid":3,"aid":3}
      ]
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};

export const efxConfig = async ({
  uToken,
}) => {
  const response = await fetch(`${BASE_URL}/efx-config`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${uToken}`,
    },
  });
  const jsonResponse = await response.json();
  return jsonResponse;
};