import "isomorphic-fetch";

import {
  spotifyAuthorizationString,
  spotifyTokenUrl,
} from "../../helpers/spotifyAuthorization";

export default async (req, res) => {
  const authorizationURL = `http://${req.headers.host}/authorized`;
  const { authCode, refreshToken } = req.query;
  const tokensRequestData = {
    grant_type: authCode ? "authorization_code" : "refresh_token",
    code: authCode,
    refresh_token: refreshToken,
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
