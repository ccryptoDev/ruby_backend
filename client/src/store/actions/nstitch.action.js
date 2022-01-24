import api from "../../api";

export const NSTITCH_DIRECT_LOGIN = "NSTITCH_DIRECT_LOGIN";
export const NSTITCH_NEW_USER = "NSTITCH_NEW_USER";
export const NSTITCH_DIRECT_USER_REGISTER = "NSTITCH_DIRECT_USER_REGISTER";
export const NSTITCH_PREAUTH_TOKEN = "NSTITCH_PREAUTH_TOKEN";
export const NSTITCH_USER_IDENTITY = "NSTITCH_USER_IDENTITY";
export const NSTITCH_GET_MOBILE = "NSTITCH_GET_MOBILE";
export const NSTITCH_SEND_CODE = "NSTITCH_SEND_CODE";
export const NSTITCH_VERIFY_CODE = "NSTITCH_VERIFY_CODE";
export const NSTITCH_GET_QUIZ = "NSTITCH_GET_QUIZ";
export const NSTITCH_VERIFY_QUIZ = "NSTITCH_VERIFY_QUIZ";
export const NSTITCH_RENEW_CODE = "NSTITCH_RENEW_CODE";
export const NSTITCH_EFX_CONFIG = "NSTITCH_EFX_CONFIG";
export const NSTITCH_DIRECT_CHANGE_EMAIL = "NSTITCH_DIRECT_CHANGE_EMAIL";
export const NSTITCH_DIRECT_CHANGE_PHONE = "NSTITCH_DIRECT_CHANGE_PHONE";
export const NSTITCH_DIRECT_CLOSE_ACCOUNT = "NSTITCH_DIRECT_CLOSE_ACCOUNT";

export function directLogin({
  email,
  password,
  firstName,
  lastName,
  token
}) {
  return {
    type: NSTITCH_DIRECT_LOGIN,
    payload: api.nstitchServer.directLogin({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      token
    }),
  };
}

export function directNewUser ({
  dToken,
  userId,
  token
}) {
  return {
    type: NSTITCH_NEW_USER,
    payload: api.nstitchServer.directNewUser({
      dToken,
      userId,
      token
    })
  }
}

export function directUserRegister({
  email,
  password,
  firstName,
  lastName,
  dToken,
  token
}) {
  return {
    type: NSTITCH_DIRECT_USER_REGISTER,
    payload: api.nstitchServer.directUserRegister({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      dToken,
      token
    })
  };
}

export function preauthToken({
  userId,
  token,
  paToken
}) {
  return {
    type: NSTITCH_PREAUTH_TOKEN,
    payload: api.nstitchApp.preauthToken({
      userId,
      token,
      paToken
    }),
  };
}

export function userIdentify({
  dob,
  mobile,
  ssn,
  street1,
  street2,
  city,
  state,
  zip,
  uToken,
}) {
  return {
    type: NSTITCH_USER_IDENTITY,
    payload: api.nstitchApp.identity({
      dob,
      mobile,
      ssn,
      street1,
      street2,
      city,
      state,
      zip,
      country: 'US',
      uToken,
    })
  };
}

export function getMobile ({
  uToken
}) {
  return {
    type: NSTITCH_GET_MOBILE,
    payload: api.nstitchApp.getMobile({
      uToken
    }),
  };
}

export function sendCode ({
  uToken,
  moToken
}) {
  return {
    type: NSTITCH_SEND_CODE,
    payload: api.nstitchApp.sendCode({
      uToken,
      moToken
    }),
  };
}

export function verifyCode ({
  uToken,
  mTransactionKey,
  passcode
}) {
  console.log('verify code info in nstitch action ********* ;',uToken, mTransactionKey, passcode);
  return {
    type: NSTITCH_VERIFY_CODE,
    payload: api.nstitchApp.verifyCode({
      uToken,
      mTransactionKey,
      passcode
    }),
  };
}

export function renewCode ({
  uToken,
  mTransactionKey
}) {
  return {
    type: NSTITCH_RENEW_CODE,
    payload: api.nstitchApp.renewCode ({
      uToken,
      mTransactionKey
    })
  }
}

export function getQuiz ({
  uToken,
}) {
  return {
    type: NSTITCH_GET_QUIZ,
    payload: api.nstitchApp.getQuiz({
      uToken,
    })
  }
}

export function verifyQuiz ({
  uToken,
  qTransactionKey,
  qzId,
  answers
}) {
  return {
    type: NSTITCH_VERIFY_QUIZ,
    payload: api.nstitchApp.verifyQuiz({
      uToken,
      qTransactionKey,
      qzId,
      // answers
    })
  }
}

export function efxConfig({
  uToken,
}) {
  return {
    type: NSTITCH_EFX_CONFIG,
    payload: api.nstitchApp.efxConfig({
      uToken
    })
  }
}

export function directChangeEmail({
  email,
  token
}) {
  return {
    type: NSTITCH_DIRECT_CHANGE_EMAIL,
    payload: api.nstitchServer.directChangeEmail({
      email,
      token
    }),
  };
}

export function directChangePhone({
  phone_number,
  token
}) {
  return {
    type: NSTITCH_DIRECT_CHANGE_PHONE,
    payload: api.nstitchServer.directChangePhone({
      phone_number,
      token
    }),
  };
}

export function directCloseAccount({
  email,
  password,
  firstName,
  lastName,
  token
}) {
  return {
    type: NSTITCH_DIRECT_CLOSE_ACCOUNT,
    payload: api.nstitchServer.directCloseAccount({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      token
    }),
  };
}