import { TransitionGroup, CSSTransition } from "react-transition-group";

import { useAppState } from "../helpers/state";
import AlbumView from "./albumView";

const Albums = () => {
  const [{ selections, pickedIndex, pickedAlbum, albums }] = useAppState();
  let filteredAlbums = selections
    .slice(0, pickedIndex + 1)
    .filter((_, i) => pickedIndex - i <= 4 && i <= pickedIndex)
    .map((id) => albums.find((album) => album.id == id));

  console.log(filteredAlbums.length, pickedIndex);
  return (
    <div className="albums-container">
      <TransitionGroup className="albums">
        {filteredAlbums.map((album, i) => {
          return (
            <CSSTransition key={album.id} timeout={300}>
              <AlbumView
                {...album}
                selected={pickedAlbum.id == album.id}
                position={i}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <style jsx>{`
        .albums-container :global(.albums) {
          display: flex;
          flex-direction: row;
          height: 200px;
          align-items: flex-end;
        }
      `}</style>
    </div>
  );
};

export default Albums;
