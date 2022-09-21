import { TransitionGroup, CSSTransition } from "react-transition-group";

import { useAppState } from "../helpers/state";
import AlbumView from "./albumView";

const numberOfAlbums = 9;

const Albums = () => {
  const [{ selections, pickedIndex, pickedAlbum, albums, playingAlbum }] =
    useAppState();
  let filteredAlbums = selections
    .slice(0, pickedIndex + 1)
    .filter((_, i) => pickedIndex - i <= numberOfAlbums - 1 && i <= pickedIndex)
    .map((id) => albums.find((album) => album.id == id));

  return (
    <div className="albums-container">
      <TransitionGroup className="albums">
        {filteredAlbums.map((album, i) => {
          const position = filteredAlbums.length - i;
          return (
            <CSSTransition key={album.id} timeout={300}>
              <AlbumView
                {...album}
                first={position == 1}
                last={position == filteredAlbums.length}
                normalizedPosition={1 - (i + 1) / filteredAlbums.length}
                selected={pickedAlbum.id == album.id}
                position={filteredAlbums.length - i}
                playingAlbum={playingAlbum}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <style jsx>{`
        .albums-container {
          padding-top: 1em;
          margin-top: auto;
        }

        .albums-container :global(.albums) {
          display: flex;
          flex-direction: row;
          height: 200px;
          width: 200px;
          align-items: flex-end;
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default Albums;
