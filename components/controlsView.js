export default ({
  forwards,
  backwards,
  backwardsDisabled,
  forwardIsShuffle = true,
}) => (
  <div className="controls">
    <p>
      <button disabled={backwardsDisabled} onClick={backwards} className="back">
        ←
      </button>
      <button
        onClick={forwards}
        className={forwardIsShuffle ? "shuffle" : "forward"}
      >
        →
      </button>
    </p>
    <style jsx>{`
      .controls {
        border-top: solid 1px #444;
        margin-top: auto;
        padding: 32px;
        align-self: stretch;
      }

      button {
        background-color: transparent;
        background: center no-repeat;
        background-size: 44px 44px;
        border-style: none;
        border-radius: 25px;
        height: 50px;
        width: 50px;
        margin: 0 16px;
      }

      button:hover {
        background-color: #1d1d1d;
      }

      button:disabled {
        opacity: 0.4;
      }

      button:disabled:hover {
        background-color: transparent;
      }

      button:active {
        background-color: #060606;
      }

      .shuffle {
        background-image: url("/btn-shuffle-static@3x.png");
        color: transparent;
      }

      .back,
      .forward {
        background-image: url("/btn-back-static@3x.png");
        color: transparent;
      }

      .forward {
        transform: scale(-1, 1);
      }
    `}</style>
  </div>
);
