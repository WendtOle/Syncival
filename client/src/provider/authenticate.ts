import { backendUrl } from "../state/loadEnvVariables"

export const authenticateWithCode = async (code: string) :Promise<{accessToken: string, refreshToken: string}> => {
    const response = await fetch(`${backendUrl}/authenticate?code=${code}`)
    
    const {accessToken, refreshToken} = await response.json()
    return {accessToken, refreshToken}

}