import { isAllowedOrigin } from "./isAllowedOrigin";

export const setCors = (req: any, res: any) => {
    const requestOrigin = req.headers.origin ?? [];
    if (isAllowedOrigin(requestOrigin)) {
        res.setHeader('Access-Control-Allow-Origin', requestOrigin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}