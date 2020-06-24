import { currentToken } from "../helpers/spotifyTokens";

export const getAllAlbums = async (offset = 0, albums = []) => {
  const { items, next } = await getAlbumsAtOffset(offset);
  if (next !== null) {
    return await getAllAlbums(offset + 50, albums.concat(items));
  } else {
    const allAlbums = albums.concat(items).map(({ album }) => ({
      name: album.name,
      covers: album.images,
      id: album.id,
      artist: album.artists[0].name,
    }));
    return allAlbums;
  }
};

const getAlbumsAtOffset = async (offset = 0) => {
  const albumsList = await fetch(
    "https://api.spotify.com/v1/me/albums?limit=50&offset=" + offset,
    {
      headers: {
        Authorization: currentToken(),
      },
    }
  );
  const reply = await albumsList.json();
  if (reply.error) throw new Error("Error fetching albums");
  return reply;
};
