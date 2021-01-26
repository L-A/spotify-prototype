import { useToken } from "../helpers/spotifyTokens";

export const playAlbum = async (uri) => {
  const playRequest = await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: await useToken(true),
    },
    body: JSON.stringify({
      context_uri: uri,
    }),
  });

  console.log(await playRequest.text());
};

// Sources:

export const getAllAlbums = async (offset = 0, albums = []) => {
  const { items, next } = await getAlbumsAtOffset(offset);
  if (next !== null) {
    return await getAllAlbums(offset + 50, albums.concat(items));
  } else {
    const allAlbums = albums.concat(items).map(({ album }) => {
      return {
        name: album.name,
        covers: album.images,
        id: album.id,
        artist: album.artists[0].name,
        uri: album.uri,
      };
    });
    return allAlbums;
  }
};

const getAlbumsAtOffset = async (offset = 0) => {
  const albumsList = await fetch(
    "https://api.spotify.com/v1/me/albums?limit=50&offset=" + offset,
    {
      headers: {
        Authorization: await useToken(true),
      },
    }
  );
  const reply = await albumsList.json();
  if (reply.error) console.log(reply);
  if (reply.error) throw new Error("Error fetching albums");
  return reply;
};
