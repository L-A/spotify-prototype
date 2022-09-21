import { SwitchTransition, CSSTransition } from "react-transition-group";

const transitionTime = 150;

const Info = ({
  artist = "",
  name = "",
  id,
}: {
  artist?: String;
  name?: String;
  id?: String;
}) => (
  <SwitchTransition>
    <CSSTransition key={id} timeout={150}>
      <div className="album-info">
        <p className="album-name">{name}</p>
        <p className="artist">{artist}</p>
        <style jsx>{`
          .album-info {
            display: flex;
            flex-direction: column;
            min-height: 6em;
            margin-top: 20px;
            will-change: opacity;
          }

          .album-name {
            margin-top: auto;
            font-size: 1em;
            font-weight: bold;
          }

          .artist {
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

export default Info;
