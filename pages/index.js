import { spotifyAuthorizationUrl } from "../helpers/spotifyAuthorization";
import { validToken, currentToken } from "../helpers/spotifyTokens";
import { useState, useEffect } from "react";

const POC = () => {
  const [ready, setReady] = useState(false);
  const [albums, setAlbums] = useState(false);

  const checkToken = () => {
    const currentTokenValid = validToken();
    setReady(currentTokenValid);
  };

  const getAlbums = () => {
    const asyncGetAlbums = async () => {
      const albumsList = await fetch(
        "https://api.spotify.com/v1/me/albums?limit=50",
        {
          headers: {
            Authorization: currentToken(),
          },
        }
      );
      const albumsJSON = await albumsList.json();
      console.log(albumsJSON);
      setAlbums(albumsJSON.items);
    };
    asyncGetAlbums();
  };

  useEffect(checkToken, []);
  useEffect(getAlbums, []);

  return (
    <div>
      {!ready ? (
        <p>
          <a href={spotifyAuthorizationUrl}>Authorize me!</a>
        </p>
      ) : (
        <div>
          <p>App ready!</p>
          {albums
            ? albums.map((item) => (
                <img src={item.album.images[1].url} key={item.album.id} />
              ))
            : false}
        </div>
      )}
      <style jsx>
        {`
          img {
            border-radius: 4px;
            box-shadow: 0 4px 8px #aaa;
            margin: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default POC;
