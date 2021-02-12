import { useState } from "react";
import { playAlbum } from "../helpers/spotifyPlayAlbum";

const rotationRange = 20;
const initialOffset = 30;
const offsetIncrement = -18;

const AlbumView = ({
  covers,
  id,
  uri,
  selected,
  position,
  first,
  last,
  normalizedPosition,
}) => {
  const play = () => playAlbum(uri);

  const [rotation] = useState(
    Math.random() * rotationRange - rotationRange / 2
  );
  const lerpedOffset =
    offsetIncrement * (position - 1) * (1 - normalizedPosition / 2);
  const xOffset = lerpedOffset;
  const yOffset = -xOffset / 2;

  return (
    <div className={"album-view " + (first ? "first" : last ? "last" : "")}>
      <a className="clickable-album" onClick={first ? play : null}>
        <img src={covers ? covers[1].url : ""} key={id} />
      </a>

      <style jsx>{`
        .album-view {
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          position: absolute;
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
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.9),
            0 0 1px rgba(220, 220, 220, 0.9), 0 16px 32px rgba(0, 0, 0, 0.4);
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.07, 1.37, 0.32, 0.955),
            box-shadow 0.6s ease-out;
          z-index: ${selected ? 2 : 1};
          opacity: 1;
        }

        .first .clickable-album:hover {
          transform: scale(1.02);
        }

        .first .clickable-album:active {
          transform: scale(0.99);
        }

        .album {
          font-weight: bold;
          font-size: 18px;
          margin: 24px 0 0;
        }

        .artist {
          font-size: 13px;
          line-height: 1;
          font-weight: normal;
          text-overflow: ellipsis;
          margin: 8px;
        }

        .artist,
        .album {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          border-radius: 3px;
          margin: 0;
          width: 100%;
          display: block;
          transition: width 0.3s ease-out;
          opacity: ${1 - normalizedPosition};
          transition: opacity 0.3s;
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
          transform: translateX(${xOffset + initialOffset}px) scaleX(0)
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
      `}</style>
    </div>
  );
};

export default AlbumView;
