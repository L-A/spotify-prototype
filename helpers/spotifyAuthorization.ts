import { encode } from "querystring";
import GetOrigin from "../helpers/getOrigin";

// URLs
const spotifyId = process.env.NEXT_PUBLIC_SPOTIFY_ID;
const spotifySecret = process.env.SPOTIFY_SECRET;
const spotifyAuthorizeEndpoint = "https://accounts.spotify.com/authorize";
const authorizedEndpoint = "/authorized";

export const spotifyTokenUrl = "https://accounts.spotify.com/api/token";

export const getSpotifyAuthorizationUrl = () => {
  const parameters = encode({
    client_id: spotifyId,
    response_type: "code",
    redirect_uri: GetOrigin() + authorizedEndpoint,
    scope:
      "user-library-read streaming user-read-playback-state user-modify-playback-state",
  });

  return spotifyAuthorizeEndpoint + "?" + parameters;
};

// Authorization strings for token exchanges
var buffer = Buffer.from(spotifyId + ":" + spotifySecret);
export const spotifyAuthorizationString = buffer.toString("base64");
