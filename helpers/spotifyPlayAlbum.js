import { useToken } from "../helpers/spotifyTokens";
import { getDevices } from "./spotifyDevices";

export const playAlbum = async (album) => {
  const { uri } = album;
  let deviceId = undefined;
  const devices = await getDevices();
  const activePlayer = devices.find((x) => x.is_active);
  if (activePlayer) deviceId = activePlayer.id;
  else if (devices.length >= 1) deviceId = devices[0].id;

  const queryUrl =
    "https://api.spotify.com/v1/me/player/play" +
    (deviceId ? `?device_id=${deviceId}` : "");

  fetch(queryUrl, {
    method: "PUT",
    headers: {
      Authorization: await useToken(true),
    },
    body: JSON.stringify({
      context_uri: uri,
    }),
  });
};
