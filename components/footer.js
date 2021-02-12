import { useEffect, useState } from "react";
import { useAppState } from "../helpers/state";
import { getDevices } from "../helpers/spotifyDevices";

const Footer = () => {
  const [devices, setDevices] = useState([]);
  const [{ appReady }] = useAppState();

  const updateDevices = () => {
    const updateDevicesAsync = async () => {
      const devices = await getDevices();
      setDevices(devices);
    };

    updateDevicesAsync();
  };

  const startCheckingDevices = () => {
    const interval = setInterval(updateDevices, 5000);
    return () => clearInterval(interval);
  };

  useEffect(updateDevices, [appReady]);
  useEffect(startCheckingDevices, []);
  const sleeping = devices.length <= 0;

  return (
    <div className="footer">
      <div className="left-box">
        <p>
          <img
            src="/icn-sound@3x.png"
            width="27"
            height="24"
            className={devices.length == 0 ? "inactive" : null}
          />{" "}
          {sleeping
            ? "Your Spotify devices are sleeping or turned off"
            : "Controlling " + devices[0].name}
        </p>
      </div>
      <div className="rightmost-box">
        <p className="smol-credit">
          By <a href="https://louis-andre.net">Louis-André Labadie</a>
        </p>
      </div>
      <style jsx>
        {`
          .footer {
            border-top: solid 1px #333;
            color: #aaa;
            display: flex;
            flex-direction: row;
            font-size: 13px;
            min-height: 44px;
            margin: auto 0 0 0;
            align-self: stretch;
          }

          .left-box {
            padding: 4px 32px;
            margin: 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          img {
            vertical-align: middle;
            margin: -2px 0 -4px;
            opacity: 1;
            transition: opacity 0.3s ease-out;
          }

          img.inactive {
            opacity: 0.4;
          }

          .rightmost-box {
            border-left: solid 1px #333;
            padding: 4px 32px;
            margin: 0 0 0 auto;
            display: flex;
            align-items: center;
          }

          .smol-credit {
            margin: auto 0;
          }

          @media (max-width: 500px) {
            .footer {
              min-height: none;
              flex-wrap: wrap;
              justify-content: space-around;
            }

            .left-box,
            .rightmost-box {
              margin: 0;
              border: none;
              padding: 0 8px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Footer;
