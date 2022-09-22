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
  try {
    const getRequest = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: await useToken(true),
        },
      }
    );

    const playState = await getRequest.json();
    console.log(getRequest);

    const {
      is_playing,
      item: { album },
    } = playState;

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
    if (process && process.env.NODE_ENV == "development") {
      console.log("Didn't receive a player state", e);
    }
    return {
      playing: false,
      album: undefined,
    };
  }
};
