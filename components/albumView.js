const AlbumView = ({ covers, name, artist, id, play }) => {
  return (
    <div className="album-view">
      <a className="clickable-album" onClick={play}>
        <img src={covers ? covers[1].url : ""} key={id} />
      </a>
      <h1 className="album">{name || "Loading"}</h1>
      <h2 className="artist">{artist || "Please wait"}</h2>

      <style jsx>{`
        .clickable-album {
          background-color: #111;
          border-radius: 3px;
          display: block;
          margin: 0 auto;
          position: relative;
          height: 300px;
          max-height: 40vh;
          overflow: hidden;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.9),
            0 0 1px rgba(220, 220, 220, 0.9), 0 16px 32px rgba(0, 0, 0, 0.4);
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.07, 1.37, 0.32, 0.955),
            box-shadow 0.6s ease-out;
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
          width: 380px;
        }

        .artist {
          font-size: 13px;
          line-height: 1;
          font-weight: normal;
          text-overflow: ellipsis;
          margin: 8px;
          width: 380px;
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
          height: 300px;
          max-height: 40vh;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default AlbumView;
