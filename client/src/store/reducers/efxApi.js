import {
  EFXAPI_OAUTH_TOKEN,
  EFXAPI_SCORE_LASTEST
} from '../actions/efxApi.action';

export const DEFAULT_STATE = {
  details: undefined,
  error: undefined,
  isLoading: false,
};

const efxApiReducer = (state = DEFAULT_STATE, action) => {
  const { payload, type } = action;

  switch ( type ) {
    // ------- Efx Oauth Token -------
    case `${EFXAPI_OAUTH_TOKEN}_REQ`:
      return state;
    case `${EFXAPI_OAUTH_TOKEN}_ACK`:
      return {
        ...state,
        details: {
          efxToken: payload?.access_token
        }
      }
    // ------ Efx Score Lastest Info ------
    case `${EFXAPI_SCORE_LASTEST}_REQ`:
      return state;
    case `${EFXAPI_SCORE_LASTEST}_ACK`:
      return {
        ...state,
        details: {
          ...state.details,
          efxScore: payload?.providerViews[0].score
        }
      }
    default:
      return state;
  }
};

export default efxApiReducer;