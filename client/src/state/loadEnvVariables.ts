export enum EnvVariables {
    BACKEND_URL = "REACT_APP_API_URL"
}

const nullableBackendUrl = process.env[EnvVariables.BACKEND_URL];
if (!nullableBackendUrl) {
    throw Error(`Environment variable ${EnvVariables.BACKEND_URL} is not set`);
}

export const backendUrl = nullableBackendUrl;
