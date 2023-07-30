import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const nullableAccessTokenAtom = atomWithStorage<string | null>("accessToken", null)
export const nullableRefreshToken = atomWithStorage<string | null>("refreshToken", null)
export const accessTokenAtom = atom<() => string>(get => () => {
    const accessToken = get(nullableAccessTokenAtom)
    if (!accessToken) {
        throw Error('access token not set')
    }
    return accessToken;
})
export const refreshTokenAtom = atom<() => string>(get => () => {
    const refreshToken = get(nullableRefreshToken)
    if (!refreshToken) {
        throw Error('access token not set')
    }
    return refreshToken;
})
export const isAuthorizedAtom = atom(get => get(nullableAccessTokenAtom) !== null && get(nullableRefreshToken) !== null)