import { backendUrl } from "../state/loadEnvVariables"

export const isAccessTokenValid = async ({accessToken, refreshToken}: {accessToken: string, refreshToken: string}): Promise<boolean> => {
    const response = await fetch(`${backendUrl}/accessTokenValid?accessToken=${accessToken}&refreshToken=${refreshToken}`)
    const tokenStatus = await response.text()
  
    if (tokenStatus === 'error'){
      throw Error('Error when trying to check if access token is expired')
    }
  
    return tokenStatus === 'ok'
  }