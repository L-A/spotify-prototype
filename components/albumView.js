export default ({ covers, name, artist, id }) => {
  if (!covers) {
    return false;
  }
  return (
    <div className="album-view">
      <img src={covers[1].url} key={id} />
      <h1 className="album">{name}</h1>
      <h2 className="artist">{artist}</h2>

      <style jsx>{`
        .album-view {
          text-align: center;
          max-height: 60vh;
          margin: auto 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .artist {
          font-size: 14px;
          font-weight: normal;
          margin: 8px 0;
          width: 380px;
          text-overflow: ellipsis;
        }

        .album {
          font-weight: bold;
          font-size: 16px;
          margin: 32px 0 8px;
          width: 380px;
        }

        .artist,
        .album {
          height: 1.6em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        img {
          border-radius: 4px;
          box-shadow: 0 4px 16px #000, 0 0 1px #ccc;
          margin: 8px auto;
          height: 300px;
          max-height: 40vh;
          display: block;
        }
      `}</style>
    </div>
  );
};
