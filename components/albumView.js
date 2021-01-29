import { playAlbum } from "../helpers/spotifyPlayAlbum";
const AlbumView = ({ covers, id, uri, selected, position }) => {
  const play = () => playAlbum(uri);
  const imageSize = selected ? 200 : 120;
  const offset = 4 - position;
  return (
    <div className="album-view">
      <a className="clickable-album" onClick={play}>
        <img src={covers ? covers[1].url : ""} key={id} />
      </a>

      <style jsx>{`
        .clickable-album {
          background-color: #111;
          border-radius: 3px;
          display: block;
          margin: 0 ${-offset * 10}px 0 0;
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

        .clickable-album:hover {
          transform: scale(1.02);
        }

        .clickable-album:active {
          transform: scale(0.99);
        }

        .album-view {
          text-align: center;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
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
          width: ${imageSize}px;
          max-width: 20vw;
          display: block;
          transition: width 0.3s ease-out;
        }

        .enter img {
        }

        .enter-active img {
        }

        .exit img {
        }

        .exit-active img {
        }
      `}</style>
    </div>
  );
};

export default AlbumView;
