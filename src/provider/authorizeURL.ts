export const getAuthorizeURL = async (): Promise<string> => {
  const response = await fetch(`./api/authorizeURL`);
  return response.text();
};
