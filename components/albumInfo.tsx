import { SwitchTransition, CSSTransition } from "react-transition-group";
import { useAppState } from "../helpers/state";

const transitionTime = 150;

const Info = ({
  artist = "",
  name = "",
  id = "",
}: {
  artist?: String;
  name?: String;
  id?: String;
}) => {
  const [{ playingAlbum }] = useAppState();

  const playing = playingAlbum && playingAlbum.id == id;

  return (
    <SwitchTransition>
      <CSSTransition key={id} timeout={150}>
        <div className="album-info">
          <p className="album-name">{name}</p>
          <div className="playing-indicator" />
          <p className="artist">{artist}</p>
          <style jsx>{`
            .album-info {
              color: ${playing ? "#fff" : "#bbb"};
              display: flex;
              flex-direction: column;
              min-height: 6em;
              margin-top: 40px;
              will-change: opacity color;
              transition: color 0.3s, text-shadow 0.3s;

              text-shadow: ${playing
                ? "0 1px 20px rgba(255,255,255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.3)"
                : "none"};
            }

            .album-name {
              margin-top: auto;
              font-size: 1em;
              font-weight: bold;
            }

            .artist {
              margin-top: 0.5em;
              font-size: 0.875em;
            }

            p {
              margin: 0.5em;
            }

            .album-info.enter {
              opacity: 0;
              transform: translateY(-4px);
            }

            .album-info.enter-active {
              opacity: 1;
              transform: translateY(0);
              transition: opacity ${transitionTime}ms,
                transform ${transitionTime}ms;
            }

            .album-info.exit {
              opacity: 1;
              transform: translateY(0);
            }

            .album-info.exit-active {
              opacity: 0;
              transform: translateY(4px);
              transition: opacity ${transitionTime}ms,
                transform ${transitionTime}ms;
            }
          `}</style>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default Info;
