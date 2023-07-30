import { backendUrl } from "../state/loadEnvVariables"

export const getData = async () :Promise<Record<string,string[]>> => {
    const response = await fetch(`${backendUrl}/data`)
    const data = await response.json()
    const parsed = Object.entries(data).reduce((acc, [key, value]) => ({...acc, [key]: JSON.parse(value as string)}), {})
    console.log(parsed)
    return parsed
}