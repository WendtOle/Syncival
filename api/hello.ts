import { VercelRequest, VercelResponse } from "@vercel/node";
import { test } from "./_test";

export default (request: VercelRequest, response: VercelResponse) => {
  const { name = "World" } = request.query;
  //test
  response.status(200).send(`Hello ${name}! ${test}`);
};
