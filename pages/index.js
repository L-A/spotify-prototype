import { useEffect } from "react";

import { StateProvider, useAppState } from "../helpers/state";
import { spotifyAuthorizationUrl } from "../helpers/spotifyAuthorization";
import { useToken } from "../helpers/spotifyTokens";
import { getAllAlbums } from "../helpers/spotifyGetAlbums";
import { playAlbum } from "../helpers/spotifyPlayAlbum";

import AlbumView from "../components/albumView";
import ControlsView from "../components/controlsView";

const App = () => {
  const [state, dispatch] = useAppState();
  const {
    appReady,
    albums,
    pickedAlbum,
    nextPickedAlbum,
    pickedIndex,
    lastPickedIndex,
  } = state;
  console.log(state);

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
    if (!appReady) return;
    const asyncGetAlbums = async () => {
      const albums = await getAllAlbums();
      dispatch({ type: "Set albums list", albums });
    };
    if (albums.length == 0) {
      asyncGetAlbums();
    }
  };

  const forwards = () => {
    if (!appReady) return;
    dispatch({ type: "Select album forwards" });
  };

  const backwards = () => {
    dispatch({ type: "Select album backwards" });
  };

  const play = () => {
    playAlbum(pickedAlbum.uri);
  };

  useEffect(checkToken, [appReady]);
  useEffect(initAlbums, [appReady]);
  useEffect(forwards, [albums]);

  if (typeof Image !== "undefined" && nextPickedAlbum) {
    new Image().src = nextPickedAlbum.covers[1].url;
  }

  return (
    <div className="root">
      {!appReady ? (
        <p>
          <a href={spotifyAuthorizationUrl}>Authorize me!</a>
        </p>
      ) : (
        <>
          <AlbumView {...pickedAlbum} play={play} />
          <ControlsView
            {...{ forwards, backwards }}
            backwardsDisabled={pickedIndex <= 0}
            forwardIsShuffle={pickedIndex == lastPickedIndex}
          />
        </>
      )}
      <style jsx>
        {`
          :global(html) {
            background-color: #252525;
            color: #ddd;
          }

          :global(body, html, #__next) {
            height: 100%;
            margin: 0;
          }

          .root {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: sans-serif;
            height: 100%;
          }

          a {
            color: #ddd;
          }
        `}
      </style>
    </div>
  );
};

const StatefulApp = () => (
  <StateProvider>
    <App />
  </StateProvider>
);

export default StatefulApp;
