import { useRouter } from "next/router";
import { useEffect } from "react";
import "isomorphic-fetch";

import { refreshTokens, validToken } from "../helpers/spotifyTokens";

const Authorized = () => {
  const { query } = useRouter();
  console.log("Query:", query);
  const authCode = query.code;

  useEffect(() => {
    if (validToken()) {
      window.location.replace("/");
      return;
    }
    if (authCode) {
      refreshTokens(authCode, false).then((_) => window.location.replace("/"));
    }
  }, [authCode]);

  return (
    <div>
      <h1>Let's get you connected!</h1>
    </div>
  );
};

export default Authorized;
