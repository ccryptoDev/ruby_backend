const BASE_URL = "https://api.uat.equifax.com/personal/consumer-data-suite";

export const efxOauthToken = async ({
  efxApiKey,
  efxAssertion
}) => {
  var details = {
    scope: 'delivery',
    grant_type: 'jwt-bearer',
    api_key: efxApiKey,
    client_assertion: efxAssertion
  };
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  const response = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    body: formBody,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  });
  const jsonResponse = await response.json();
  console.log('efx oauth token json response ;', jsonResponse);
  return jsonResponse;
};

export const efxScoreLastest = async ( {
  efxToken
}) => {
  const response = await fetch(`${BASE_URL}/v1/creditScore/latest?format=json`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${efxToken}`,
    },
  });
  const jsonResponse = await response.json();
  console.log('efx score lastest info ;', jsonResponse);
  return jsonResponse;
}