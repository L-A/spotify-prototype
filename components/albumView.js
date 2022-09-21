import { useState } from "react";
import { playAlbum } from "../helpers/spotifyPlayAlbum";
import { useAppState } from "../helpers/state";

const rotationRange = 20;
const initialOffset = 30;
const offsetIncrement = -18;

const AlbumView = ({
  selected,
  position,
  first,
  last,
  normalizedPosition,
  playingAlbum,
  ...album
}) => {
  const [state, dispatch] = useAppState();
  const play = () => {
    playAlbum(album);
    dispatch({ type: "Set device album", album });
  };

  const { covers, id } = album;

  const [rotation] = useState(
    Math.random() * rotationRange - rotationRange / 2
  );
  const lerpedOffset =
    offsetIncrement * (position - 1) * (1 - normalizedPosition / 2);
  const xOffset = lerpedOffset;
  const yOffset = -xOffset / 2;

  const playing = playingAlbum && playingAlbum.id == id;

  return (
    <div className={"album-view " + (first ? "first" : last ? "last" : "")}>
      <a className="clickable-album" onClick={first ? play : null}>
        <img className="cover" src={covers ? covers[1].url : ""} key={id} />
      </a>

      <style jsx>{`
        .album-view {
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          height: 100%;
          width: 100%;
          transform: translateX(${xOffset}px) translateY(${yOffset}px)
            rotate(${rotation}deg);
          background-color: #252525;
          transition: opacity 0.3s, transform 0.3s ease-out;
        }

        .clickable-album {
          background-color: #111;
          border-radius: 3px;
          display: block;
          position: relative;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.9),
            0 0 1px rgba(220, 220, 220, 0.9), 0 16px 32px rgba(0, 0, 0, 0.4);
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.07, 1.37, 0.32, 0.955),
            box-shadow 0.6s ease-out;
          z-index: ${selected ? 2 : 1};
          opacity: 1;
          touch-action: manipulation;
        }

        .first .clickable-album:hover {
          transform: scale(1.02);
        }

        .first .clickable-album:active {
          transform: scale(0.99);
        }

        .cover {
          border-radius: 3px;
          margin: 0;
          width: 100%;
          display: block;
          transition: width 0.3s ease-out;
          opacity: ${1 - normalizedPosition};
          transition: opacity 0.3s;
        }

        .clickable-album::before {
          content: "";
          display: block;
          width: 90%;
          height: 90%;
          top: 5%;
          left: 0;
          background: #000;
          background-image: linear-gradient(
            311deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(25, 25, 25, 1) 50%,
            rgba(0, 0, 0, 1) 100%
          );
          border: solid 2px #191919;
          position: absolute;
          border-radius: 50%;
          z-index: -1;
          transition: left 0.6s cubic-bezier(0.07, 1.37, 0.32, 0.955);
          left: ${playing && selected ? "60px" : "5%"};
          animation: ${true ? "fake-turn 3s linear infinite" : "none"};
        }

        .enter {
          opacity: 0;
          transform: translateX(${xOffset}px) translateY(${yOffset}px)
            rotate(${rotation}deg);
        }

        .enter-active {
          opacity: 1;
          transform: translateX(${xOffset}px) translateY(${yOffset}px)
            rotate(${rotation}deg);
          transition: opacity 0.3s, transform 0.3s;
        }

        .exit {
          opacity: 0;
          transform: translateX(${xOffset}px) translateY(${yOffset}px)
            rotate(${rotation}deg);
        }

        .exit-active {
          opacity: 0;
          transform: translateX(${xOffset}px) translateY(${yOffset}px)
            rotate(${rotation}deg);
          transition: opacity 0.3s, transform 0.3s;
        }

        .first.enter {
          opacity: 0;
          transform: translateX(${xOffset + initialOffset}px)
            translateY(${yOffset + 10}px) rotate(${rotation * 2}deg);
        }

        .first.enter-active {
          opacity: 1;
          transform: translateX(${xOffset}px) translateY(${yOffset}px)
            rotate(${rotation}deg);
          transition: opacity 0.3s, transform 0.3s;
        }

        .first.exit {
          opacity: 1;
          transform: translateX(${xOffset}px) rotate(${rotation}deg);
          transition: opacity 0.3s, transform 0.3s;
        }

        .first.exit-active {
          opacity: 0;
          transform: translateX(${xOffset + initialOffset}px)
            translateY(${yOffset + 10}px) rotate(${rotation * 2}deg);
        }

        @keyframes fake-turn {
          0% {
            transform: rotate(0deg);
          }
          0% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AlbumView;
