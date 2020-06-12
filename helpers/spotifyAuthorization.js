import { encode } from "querystring";

// URLs
const spotifyId = process.env.NEXT_PUBLIC_SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;
const spotifyAuthorizeUrl = "https://accounts.spotify.com/authorize";
const authorizationURL = "http://localhost:3000/authorized";

export const spotifyTokenUrl = "https://accounts.spotify.com/api/token";

const parameters = encode({
  client_id: spotifyId,
  response_type: "code",
  redirect_uri: authorizationURL,
  scopes: "user-library-read streaming",
});
export const spotifyAuthorizationUrl = spotifyAuthorizeUrl + "?" + parameters;

// Authorization strings for token exchanges
var buffer = new Buffer(spotifyId + ":" + spotifySecret);
export const spotifyAuthorizationString = buffer.toString("base64");

// Token store utilities
export const storeTokens = (data) =>
  window.localStorage.setItem("spotifyTokens", JSON.stringify(data));
export const getTokens = () =>
  JSON.parse(window.localStorage.getItem("spotifyTokens"));

// Token retrieval method
export const refreshTokens = async (authCode) => {
  console.log("Fetching tokens");
  const tokenRequest = await fetch(
    "http://localhost:3000/api/getTokens?authCode=" + authCode
  );
  const tokenResult = await tokenRequest.json();
  console.log("Retrieved token", tokenResult);
  if (tokenResult.access_token) {
    let expires_at = new Date().getTime() + tokenResult.expires_in;
    storeTokens({ ...tokenResult, expires_at });
    return true;
  } else {
    console.log("Token retrieval failed!");
    return false;
  }
};
