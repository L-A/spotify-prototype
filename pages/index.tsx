import { useEffect } from "react";

import { StateProvider, useAppState } from "../helpers/state";
import { getSpotifyAuthorizationUrl } from "../helpers/spotifyAuthorization";
import { useToken } from "../helpers/spotifyTokens";
import { getAllAlbums } from "../helpers/spotifyGetAlbums";
import { getPlaybackState } from "../helpers/spotifyDevices";

import Layout from "../components/layout";
import Spinner from "../components/spinner";
import Albums from "../components/albumsView";
import AlbumInfo from "../components/albumInfo";
import ControlsView from "../components/controlsView";
import Footer from "../components/footer";

const App = ({ spotifyAuthorizationUrl }) => {
  const [state, dispatch] = useAppState();
  const {
    appReady,
    needsAuth,
    albums,
    pickedAlbum,
    nextPickedAlbum,
    pickedIndex,
    lastPickedIndex,
    playingAlbum,
  } = state;

  if (process && process.env.NODE_ENV == "development") {
    console.log("State update:", state);
  }

  const checkToken = () => {
    const asyncCheckToken = async () => {
      const currentTokenValid = await useToken();
      if (currentTokenValid) {
        dispatch({ type: "Set app to ready" });
      } else {
        dispatch({ type: "Set app to need authorization" });
      }
    };
    asyncCheckToken();
  };

  const initAlbums = () => {
    if (!appReady) return;
    const asyncGetAlbums = async () => {
      const albums = await getAllAlbums();
      const playbackState = await getPlaybackState();
      const selectedAlbumId = playbackState && playbackState.album?.id;

      dispatch({ type: "Set albums list", albums, selectedAlbumId });
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

  const updatePlayerState = () => {
    const asyncGetPlayerState = async () => {
      const playbackState = await getPlaybackState();
      if (playbackState?.playing) {
        dispatch({ type: "Set device to playing" });
        dispatch({ type: "Set device album", album: playbackState.album });
      }
    };
    setTimeout(asyncGetPlayerState, 1000);
  };

  const setupPlayerUpdates = () => {
    const interval = setInterval(updatePlayerState, 10 * 1000);
    updatePlayerState();
    return () => clearInterval(interval);
  };

  useEffect(checkToken, [appReady, needsAuth]);
  useEffect(initAlbums, [appReady]);
  useEffect(forwards, [albums]);
  useEffect(setupPlayerUpdates, []);

  if (typeof Image !== "undefined" && nextPickedAlbum) {
    new Image().src = nextPickedAlbum.covers[1].url;
  }

  return (
    <Layout>
      {needsAuth ? (
        <>
          <p>
            Hi! I'll need your authorization to read your account's stored
            albums, and play them if you ask me to.
          </p>
          <a className="authorize-button" href={spotifyAuthorizationUrl}>
            Connect to&nbsp;Spotify
          </a>
          <p className="fyi">
            <small>
              Good to know: you can manage all your Spotify apps{" "}
              <a href="https://www.spotify.com/us/account/apps/">
                on here, if needed
              </a>
              !
            </small>
          </p>
        </>
      ) : !appReady || albums.length == 0 ? (
        <Spinner />
      ) : (
        <>
          <Albums />
          <AlbumInfo {...pickedAlbum} />
          <ControlsView
            {...{ forwards, backwards }}
            backwardsDisabled={pickedIndex <= 0}
            forwardIsShuffle={pickedIndex == lastPickedIndex}
          />
          <Footer />
        </>
      )}
      <style jsx>{`
        p {
          color: #aaa;
          margin: 1em 8px;
          line-height: 1.2;
          max-width: 280px;
        }

        .authorize-button {
          background: rgb(29, 185, 84);
          color: #fff;
          display: block;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-radius: 28px;
          padding: 16px 24px 12px;
          text-decoration: none;
          margin: 2em 8px;
          cursor: default;
          transition: background 0.1s, transform 0.1s;
          will-change: transform;
        }

        .authorize-button:hover {
          background: rgb(30, 215, 96);
          transform: scale(1.02);
        }

        .fyi {
          color: #999;
          margin-top: 1em;
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
