import { spotifyApi } from "./getSpotifyApi.ts";
import { scopes } from "./shopifyAuthorisationScopes.ts";

export const createAuthorizeURL = (requestOrigin: string) => {
  spotifyApi.setRedirectURI(requestOrigin);
  return spotifyApi.createAuthorizeURL(scopes, "some-state-of-my-choice", true);
};
