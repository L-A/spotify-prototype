import { storeItem, getStoredItem } from "./storage";

export const currentToken = () => {
  return "Bearer " + getStoredItem("access_token");
};

export const validToken = () => {
  const expires_at = getStoredItem("token_expiry");
  return expires_at && expires_at > new Date().getTime();
};

export const useTokens = async () => {
  if (guardForServer()) return;
  const expires_at = getStoredItem("token_expiry");
  if (expires_at > new Date().getTime()) {
    return getStoredItem("access_token");
  } else {
    return await refreshTokens(getStoredItem("refresh_token"));
  }
};

// Token retrieval method
export const refreshTokens = async (code, refresh = true) => {
  const arg = refresh ? "refreshToken=" : "authCode=";
  const tokenRequest = await fetch(
    "http://localhost:3000/api/getTokens?" + arg + code
  );
  const jsonResult = await tokenRequest.json();
  const { refresh_token, access_token, expires_in } = jsonResult;
  if (refresh_token) storeItem("refresh_token", refresh_token);
  if (access_token && expires_in) {
    let expires_at = new Date().getTime() + expires_in * 1000; // Expiry is given in seconds
    storeItem("access_token", access_token);
    storeItem("token_expiry", expires_at);
    return access_token;
  } else {
    console.log(jsonResult);
    console.log("Token retrieval failed!");
    return false;
  }
};

const guardForServer = () => {
  if (typeof window === "undefined") {
    console.log("Don't run token code on the server!");
    return true;
  }
  return false;
};
