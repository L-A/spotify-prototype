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
  scope:
    "user-library-read streaming user-read-playback-state user-modify-playback-state",
});
export const spotifyAuthorizationUrl = spotifyAuthorizeUrl + "?" + parameters;

// Authorization strings for token exchanges
var buffer = Buffer.from(spotifyId + ":" + spotifySecret);
export const spotifyAuthorizationString = buffer.toString("base64");
