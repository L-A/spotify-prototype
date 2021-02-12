const spinner = () => {
  return (
    <>
      <div className="spinner">
        <div className="spinner-two" />
        <div className="spinner-one" />
      </div>
      <p>Loading. Nice collection!</p>
      <style jsx>
        {`
          .spinner {
            position: relative;
            height: 20px;
            width: 20px;
            margin: 30px;
          }
          .spinner-one,
          .spinner-two {
            background-color: #fff;
            border-radius: 2px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            animation: spinner 0.8s linear infinite;
          }
          .spinner-two {
            background-color: #777;
            animation: spinner 1.2s linear infinite reverse;
          }

          p {
            font-size: 0.875em;
          }

          @keyframes spinner {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

export default spinner;
