import "isomorphic-fetch";
const authorizationURL = "http://localhost:3000/authorized";

import {
  spotifyAuthorizationString,
  spotifyTokenUrl,
} from "../../helpers/spotifyAuthorization";

export default async (req, res) => {
  const { authCode } = req.query;
  const tokensRequestData = {
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: authorizationURL,
  };
  const tokenRequest = await fetch(spotifyTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${spotifyAuthorizationString}`,
    },
    body: new URLSearchParams(tokensRequestData),
  });
  const tokenResponse = await tokenRequest.json();
  res.send(tokenResponse);
};
