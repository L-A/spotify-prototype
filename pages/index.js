import { useEffect } from "react";

import { StateProvider, useAppState } from "../helpers/state";
import { getSpotifyAuthorizationUrl } from "../helpers/spotifyAuthorization";
import { useToken } from "../helpers/spotifyTokens";
import { getAllAlbums } from "../helpers/spotifyGetAlbums";

import Layout from "../components/layout";
import Albums from "../components/albumsView";
import ControlsView from "../components/controlsView";

const App = ({ spotifyAuthorizationUrl }) => {
  const [state, dispatch] = useAppState();
  const {
    appReady,
    albums,
    pickedAlbum,
    nextPickedAlbum,
    pickedIndex,
    lastPickedIndex,
  } = state;
  if (process && process.env.NODE_ENV == "development") {
    console.log("State update:", state);
  }

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
    <Layout>
      {!appReady ? (
        <p>
          <a className="authorize-button" href={spotifyAuthorizationUrl}>
            Authorize me!
          </a>
        </p>
      ) : (
        <>
          <Albums />
          <ControlsView
            {...{ forwards, backwards }}
            backwardsDisabled={pickedIndex <= 0}
            forwardIsShuffle={pickedIndex == lastPickedIndex}
          />
        </>
      )}
      <style jsx>{`
        .authorize-button {
          border-radius: 12px;
          background: #333;
          padding: 14px 20px 12px;
          text-decoration: none;
        }

        .authorize-button:hover {
          background: #444;
        }
      `}</style>
    </Layout>
  );
};

const StatefulApp = (props) => (
  <StateProvider>
    <App {...props} />
  </StateProvider>
);

StatefulApp.getInitialProps = async ({ req }) => {
  const origin = req ? "http://" + req.headers.host : window.location.origin;
  return {
    spotifyAuthorizationUrl: getSpotifyAuthorizationUrl(origin),
  };
};

export default StatefulApp;
