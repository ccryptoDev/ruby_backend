import {
  NSTITCH_DIRECT_LOGIN,
  NSTITCH_NEW_USER,
  NSTITCH_DIRECT_USER_REGISTER,
  NSTITCH_PREAUTH_TOKEN,
  NSTITCH_USER_IDENTITY,
  NSTITCH_GET_MOBILE,
  NSTITCH_SEND_CODE,
  NSTITCH_VERIFY_CODE,
  NSTITCH_GET_QUIZ,
  NSTITCH_VERIFY_QUIZ,
  NSTITCH_RENEW_CODE,
  NSTITCH_EFX_CONFIG,
  NSTITCH_DIRECT_CHANGE_EMAIL,
  NSTITCH_DIRECT_CHANGE_PHONE,
  NSTITCH_DIRECT_CLOSE_ACCOUNT,
} from "../actions/nstitch.action";

export const DEFAULT_STATE = {
  details: undefined,
  error: undefined, 
  isLoading: false,
  token: undefined,
};

const nstitchReducer = (state = DEFAULT_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    // ------ User Login ----------
    case `${NSTITCH_DIRECT_LOGIN}_REQ`:
      return {
        ...state,
        details: undefined,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${NSTITCH_DIRECT_LOGIN}_ACK`:
      return {
        ...state,
        details: {
          dToken: payload?.token,
          rdToken: payload?.refresh
        },
        error: payload?.error,
        token: payload?.token,
      };
    case `${NSTITCH_DIRECT_LOGIN}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error credit score",
        isLoading: false,
        token: undefined,
      };
    // ----- New User Token ------
    case `${NSTITCH_NEW_USER}_REQ`:
      return state;
    case `${NSTITCH_NEW_USER}_ACK`:
      return {
        ...state,
        details: {
          paToken: payload?.token,
          stitchUserId: payload?.userId
        }
      }
    // ----- User Register -------
    case `${NSTITCH_DIRECT_USER_REGISTER}_REQ`:
      return {
        ...state,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${NSTITCH_DIRECT_USER_REGISTER}_ACK`:
      return {
        ...state,
        details: {
          paToken: payload?.token,
          stitchUserId: payload?.userId
        },
        error: payload?.error,
        token: payload?.token,
      };
    case `${NSTITCH_DIRECT_USER_REGISTER}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error credit score",
        isLoading: false,
        token: undefined,
      };
    // ------ Preauth Token --------
    case `${NSTITCH_PREAUTH_TOKEN}_REQ`:
      return {
        ...state,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${NSTITCH_PREAUTH_TOKEN}_ACK`:
      return {
        ...state,
        details: {
          uToken: payload?.token
        },
        error: payload?.error,
        token: payload?.token,
      };
    case `${NSTITCH_PREAUTH_TOKEN}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error credit score",
        isLoading: false,
        token: undefined,
      };
    // ------- User Identity -------------
    case `${NSTITCH_USER_IDENTITY}_REQ`:
      return state;
    case `${NSTITCH_USER_IDENTITY}_ACK`:
      return {
        ...state,
        details: {
          ...state.details
        }
      }
    // --------- Get Mobile -----------
    case `${NSTITCH_GET_MOBILE}_REQ`:
      return state;
    case `${NSTITCH_GET_MOBILE}_ACK`:
      return {
        ...state,
        details: {
          ...state.details,
          moToken: payload?.token
        }
      }
    // --------- Send Code -----------
    case `${NSTITCH_SEND_CODE}_REQ`:
      return state;
    case `${NSTITCH_SEND_CODE}_ACK`:
      return {
        ...state,
        details: {
          ...state.details,
          mTransactionKey: payload?.key,
          passcode: payload?.passcode
        }
      }
    // ---------- Verify Code ------------
    case `${NSTITCH_VERIFY_CODE}_REQ`:
      return state;
    case `${NSTITCH_VERIFY_CODE}_ACK`:
      return {
        ...state,
        details: {
          ...state.details,
          nstitchId: payload?.id,
          nstitchEmail: payload?.email,
          nstitchFname: payload?.fname,
          nstitchLname: payload?.lname,
          nstitchIdpass: payload?.idpass,
          nstitchCreatedAt: payload?.createdAt,
          nstitchUpdatedAt: payload?.updatedAt,
          nstitchSmsMsg: payload?.smsMsg,
          nstitchEmailMsg: payload?.emailMsg,
          nstitchPushMsg: payload?.pushMsg,
          nstitchFlags: payload?.flags,
        }
      }
    // ---------- Renew Code -----------
    case `${NSTITCH_RENEW_CODE}_REQ`:
      return state;
    case `${NSTITCH_RENEW_CODE}_ACK`:
      return {
        ...state,
        details:{
          ...state.details,
          mTransactionKey: payload?.key,
          passcode: payload?.passcode
        }
      }
    // ------- Get Quiz --------
    case `${NSTITCH_GET_QUIZ}_REQ`:
      return state;
    case `${NSTITCH_GET_QUIZ}_ACK`:
      return {
        ...state,
        details: {
          qTransactionKey: payload?.key,
          qzId: payload?.id
        }
      }
    // ------- Verify Quiz -------
    case `${NSTITCH_VERIFY_QUIZ}_REQ`:
      return state;
    case `${NSTITCH_VERIFY_QUIZ}_ACK`:
      let verifyQuizInfo = state.verifyQuizInfo
      return {
        ...state,
        details: verifyQuizInfo
      }
    // ------- Efx Config --------
    case `${NSTITCH_EFX_CONFIG}_REQ`:
      return state;
    case `${NSTITCH_EFX_CONFIG}_ACK`:
      return {
        ...state,
        details: {
          ...state.details,
          efxUrl: payload?.url,
          efxApiKey: payload?.id,
          efxAssertion: payload?.secret
        }
      }
    // ------- Change Email -------
    case `${NSTITCH_DIRECT_CHANGE_EMAIL}_REQ`:
      return {
        ...state,
        details: undefined,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${NSTITCH_DIRECT_CHANGE_EMAIL}_ACK`:
      return {
        ...state,
        details: {
          email: payload?.nstitch?.email,
        },
        error: payload?.error,
        token: payload?.token,
      };
    case `${NSTITCH_DIRECT_CHANGE_EMAIL}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error credit score",
        isLoading: false,
        token: undefined,
      };
    // ----- Change Phone ------
    case `${NSTITCH_DIRECT_CHANGE_PHONE}_REQ`:
      return {
        ...state,
        details: undefined,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${NSTITCH_DIRECT_CHANGE_PHONE}_ACK`:
      window.localStorage.setItem("sequin_token", payload?.token);
      return {
        ...state,
        details: {
          phone_number: payload?.nstitch?.phone_number,
        },
        error: payload?.error,
        token: payload?.token,
      };
    case `${NSTITCH_DIRECT_CHANGE_PHONE}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error credit score",
        isLoading: false,
        token: undefined,
      };
    // ------- CLose Account -------
    case `${NSTITCH_DIRECT_CLOSE_ACCOUNT}_REQ`:
      return {
        ...state,
        details: undefined,
        error: undefined,
        isLoading: true,
        token: undefined,
      };
    case `${NSTITCH_DIRECT_CLOSE_ACCOUNT}_ACK`:
      window.localStorage.setItem("sequin_token", payload?.token);
      return {
        ...state,
        details: {
          email: payload?.nstitch?.email,
          firstName: payload?.nstitch?.first_name,
          lastName: payload?.nstitch?.last_name,
          password: payload?.nstitch?.password,
        },
        error: payload?.error,
        token: payload?.token,
      };
    case `${NSTITCH_DIRECT_CLOSE_ACCOUNT}_ERR`:
      return {
        ...state,
        details: undefined,
        error: "Error credit score",
        isLoading: false,
        token: undefined,
      };
    // ----------------------
    default:
      return state;
  }
};

export default nstitchReducer;
