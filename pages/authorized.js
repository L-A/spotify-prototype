import { useRouter } from "next/router";
import { useEffect } from "react";
import "isomorphic-fetch";

import { refreshTokens, validToken } from "../helpers/spotifyTokens";

const Authorized = ({ origin }) => {
  const { query } = useRouter();
  console.log("Query:", query);
  const authCode = query.code;

  useEffect(() => {
    if (validToken()) {
      window.location.replace("/");
      return;
    }
    if (authCode) {
      refreshTokens(authCode, false, origin).then((_) =>
        window.location.replace("/")
      );
    }
  }, [authCode]);

  return (
    <div>
      <h1>Let's get you connected!</h1>
    </div>
  );
};

Authorized.getInitialProps = async ({ req }) => {
  const origin = req ? "http://" + req.headers.host : window.location.origin;
  return {
    origin,
  };
};

export default Authorized;
