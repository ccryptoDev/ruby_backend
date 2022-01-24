import api from '../../api';

export const EFXAPI_OAUTH_TOKEN = "EFXAPI_OAUTH_TOKEN";
export const EFXAPI_SCORE_LASTEST = "EFXAPI_SCORE_LASTEST";

export function efxOauthToken({
  efxApiKey,
  efxAssertion
}) {
  return {
    type: EFXAPI_OAUTH_TOKEN,
    payload: api.efxApi.efxOauthToken({
      efxApiKey,
      efxAssertion
    })
  }
}

export function efxScoreLastest({
  efxToken
}) {
  return {
    type: EFXAPI_SCORE_LASTEST,
    payload: api.efxApi.efxScoreLastest({
      efxToken
    })
  }
}