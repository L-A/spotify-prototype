import { useToken } from "./spotifyTokens";

export const getDevices = async () => {
  const getRequest = await fetch(
    "https://api.spotify.com/v1/me/player/devices",
    {
      headers: {
        Authorization: await useToken(true),
      },
    }
  );

  const { devices } = await getRequest.json();
  if (devices && devices.length >= 1) {
    return devices;
  }
  return [];
};
