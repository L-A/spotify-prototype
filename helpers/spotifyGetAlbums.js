import { useToken } from "../helpers/spotifyTokens";

export const getAllAlbums = async (albums = []) => {
  const { items, total } = await getAlbumsAtOffset();
  let results = items;

  if (total > 50) {
    let currentPosition = 50;
    let waitingRequests = [];

    while (currentPosition <= total) {
      waitingRequests.push(getAlbumsAtOffset(currentPosition));
      currentPosition += 50;
    }

    const restOfItems = await Promise.all(waitingRequests);
    console.log("Rest of items", restOfItems);

    restOfItems.forEach(({ items }) => {
      results = results.concat(items);
    });
  }

  const allAlbums = results.map(({ album }) => {
    return {
      name: album.name,
      covers: album.images,
      id: album.id,
      artist: album.artists[0].name,
      uri: album.uri,
    };
  });

  return allAlbums;
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
