import { spotifyAuthorizationUrl } from "../helpers/spotifyAuthorization";

export default () => {
  return (
    <div>
      <a href={spotifyAuthorizationUrl}>Authorize me!</a>
    </div>
  );
};
