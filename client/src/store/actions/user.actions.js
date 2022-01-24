import api from "../../api";

export const USER_AUTO_LOGIN = "USER_AUTO_LOGIN";
export const USER_GET_FINANCIALS = "USER_GET_FINANCIALS";
export const USER_GET_CREDIT_SCORES = "USER_GET_CREDIT_SCORES";
export const USER_SAVE_CREDIT_SCORE = "USER_SAVE_CREDIT_SCORE";
export const USER_ENABLE_ALERTS = "USER_ENABLE_ALERTS";
export const USER_DISABLE_ALERTS = "USER_DISABLE_ALERTS";
export const USER_SAVE_REFERRAL = "USER_SAVE_REFERRAL";
export const USER_REFRESH_FINANCIALS = "USER_REFRESH_FINANCIALS";
export const USER_REFRESH_FINANCIALS_DELAY = "USER_REFRESH_FINANCIALS_DELAY";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_REGISTER = "USER_REGISTER";
export const USER_RESET_PASSWORD_CREATE = "USER_RESET_PASSWORD_CREATE";
export const USER_RESET_PASSWORD_UPDATE = "USER_RESET_PASSWORD_UPDATE";
export const USER_UPDATE_DEFAULT_ACCOUNT = "USER_UPDATE_DEFAULT_ACCOUNT";

export function autoLogin({ token }) {
  return {
    type: USER_AUTO_LOGIN,
    payload: api.user.autoLogin({ token }).then((res) =>
      api.user
        .getFinancials({ token, userId: res?.id })
        .then((financialsRes) => 
          api.user
            .getCreditScores({token, userId: res?.id })
            .then((creditScoresRes) => {
              return {
                user: res,
                financials: financialsRes,
                creditScores: creditScoresRes
              }
            })        
        ),
    ),
  };
}

export function getFinancials({ token, userId }) {
  return {
    type: USER_GET_FINANCIALS,
    payload: api.user.getFinancials({ token, userId }),
  };
}

export function getCreditScores({ token, userId }) {
  return {
    type: USER_GET_CREDIT_SCORES,
    payload: api.user.getCreditScores({ token, userId })
  }
}

export function toggleAlerts({token, enableAlerts}) {
  return enableAlerts ?
    {
      type: USER_ENABLE_ALERTS,
      payload: api.user.enableAlerts({token})
    }
    :
    {
      type: USER_DISABLE_ALERTS,
      payload: api.user.disableAlerts({token})
    }
}

export function saveCreditScore({token, score}) {
  return {
    type: USER_SAVE_CREDIT_SCORE,
    payload: api.user.saveCreditScore({token, score})
  }
}

export function updateDefaultAccountId({token, accountId}) {
  return {
    type: USER_UPDATE_DEFAULT_ACCOUNT,
    payload: api.user.updateDefaultAccountId({token, accountId}).then(res => {
      return {user: res}
    })
  }
}

export function saveReferral({token, email}) {
  return {
    type: USER_SAVE_REFERRAL,
    payload: api.user.saveReferral({token, email})
  }
}

export function refreshFinancials({ token, userId, delay }) {
  return !!delay ?
    {
      type: USER_REFRESH_FINANCIALS_DELAY,
      payload: api.user.refreshFinancialsDelay({ token, userId, delay }),
    } :
    {
      type: USER_REFRESH_FINANCIALS,
      payload: api.user.refreshFinancials({ token, userId }),
    }
}

export function login({ email, password }) {
  return {
    type: USER_LOGIN,
    payload: api.user.login({ email, password })
  };
}

export function logout() {
  return {
    type: USER_LOGOUT,
  };
}

export function register({
  email,
  firstName,
  lastName,
  password,
  phoneNumber,
}) {
  return {
    type: USER_REGISTER,
    payload: api.user.register({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      phone_number: phoneNumber,
    }),
  };
}

export function resetPasswordCreate({ email }) {
  return {
    type: USER_RESET_PASSWORD_CREATE,
    payload: api.user.resetPasswordCreate({ email })
  };
}

export function resetPasswordUpdate({ password, confirmPassword, digest }) {
  return {
    type: USER_RESET_PASSWORD_UPDATE,
    payload: api.user.resetPasswordUpdate({ password, confirmPassword, digest })
  };
}