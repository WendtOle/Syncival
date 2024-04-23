import type { VercelResponse, VercelRequest } from "@vercel/node";
// @ts-ignore
import { createAuthorizeURL } from "./src/createAuthorizeURL.ts";

const authorizeURL = (request: VercelRequest, response: VercelResponse) => {
  const requestOrigin = request.headers.origin;
  response.send(createAuthorizeURL(requestOrigin ?? "localhost:3000"));
};

export default authorizeURL;
