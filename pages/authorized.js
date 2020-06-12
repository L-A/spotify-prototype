import { useRouter, useState } from "next/router";
import { useEffect } from "react";
import "isomorphic-fetch";

import { refreshTokens } from "../helpers/spotifyAuthorization";

export default () => {
  const { query } = useRouter();
  const authCode = query.code;

  useEffect(() => {
    if (authCode) {
      refreshTokens(authCode);
    }
  }, [authCode]);

  return (
    <div>
      <h1>Let's get you connected!</h1>
    </div>
  );
};
