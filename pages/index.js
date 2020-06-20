import { StateProvider, useAppState } from "../helpers/state";
import { spotifyAuthorizationUrl } from "../helpers/spotifyAuthorization";
import { useToken } from "../helpers/spotifyTokens";
import { getAllAlbums } from "../helpers/spotifyGetAlbums";
import { useState, useEffect } from "react";

const App = () => {
  const [state, dispatch] = useAppState();
  const { appReady, albums, pickedAlbum } = state;

  const [pastSelections, setPastSelections] = useState([]);

  const checkToken = () => {
    const asyncCheckToken = async () => {
      const currentTokenValid = await useToken();
      if (currentTokenValid) {
        dispatch({ type: "Set app to ready" });
      }
    };
    asyncCheckToken();
  };

  const initAlbums = () => {
    const asyncGetAlbums = async () => {
      const albums = await getAllAlbums();
      dispatch({ type: "Set albums list", albums });
    };
    asyncGetAlbums();
  };

  const pickAlbum = () => {
    const limit = albums.length;
    let position = Math.floor(Math.random() * limit);
    dispatch({ type: "Set picked album", album: albums[position] });
    setPastSelections(pastSelections.concat([pickedAlbum]));
    console.log(pastSelections);
  };

  useEffect(checkToken, []);
  useEffect(initAlbums, []);

  return (
    <>
      {!appReady ? (
        <p>
          <a href={spotifyAuthorizationUrl}>Authorize me!</a>
        </p>
      ) : (
        <div>
          <p>App ready!</p>
          <p>
            <button onClick={pickAlbum}>Pick album</button>
          </p>
          {pickedAlbum ? (
            <>
              <img src={pickedAlbum.covers[1].url} key={pickedAlbum.id} />
              <h1>{pickedAlbum.name}</h1>
              <h2>{pickedAlbum.artist}</h2>
            </>
          ) : (
            false
          )}
        </div>
      )}
      <style jsx>
        {`
          :global(html) {
            background-color: #111;
            color: #ddd;
          }

          div {
            font-family: sans-serif;
            text-align: center;
          }

          img {
            border-radius: 4px;
            box-shadow: 0 4px 16px #000, 0 0 1px #ccc;
            margin: 8px;
          }
        `}
      </style>
    </>
  );
};

export default () => (
  <StateProvider>
    <App />
  </StateProvider>
);
