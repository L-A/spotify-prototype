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

export const getPlaybackState = async () => {
  const getRequest = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: await useToken(true),
      },
    }
  );
  try {
    const {
      is_playing,
      item: { album },
    } = await getRequest.json();

    return {
      playing: is_playing,
      album: {
        name: album.name,
        covers: album.images,
        id: album.id,
        artist: album.artists[0].name,
        uri: album.uri,
      },
    };
  } catch (e) {
    console.error(e);
  }
};
