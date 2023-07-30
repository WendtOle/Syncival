import { ReactElement, useEffect, useState } from "react"
import { getAuthorizeURL } from "../provider/authorizeURL"
import "./App.css"
import { useAtomValue, useSetAtom } from "jotai"
import { isAuthorizedAtom, accessTokenAtom, refreshTokenAtom, nullableAccessTokenAtom, nullableRefreshToken } from "../state/auth"
import { isAccessTokenValid } from "../provider/accessTokenValid"
import { refreshAccessToken } from "../provider/refreshAccessToken"
import { authenticateWithCode } from "../provider/authenticate"

type State = 'loads' | 'needsAuthentication' | 'authenticated'

export const AuthenticationWrapper = ({children}: {children: any}): ReactElement => {
    const [authenticationState, setAuthenticationState] = useState<State>('loads')
    const isAuthorized = useAtomValue(isAuthorizedAtom)
    const accessToken = useAtomValue(accessTokenAtom)
    const refreshToken = useAtomValue(refreshTokenAtom)
    const setNullableAccessToken = useSetAtom(nullableAccessTokenAtom)
    const setNullableRefreshToken = useSetAtom(nullableRefreshToken)

    useEffect(() => {
        const something = async () => {
            if (!isAuthorized) {
                setAuthenticationState('needsAuthentication')
                return
            }
            if (!await isAccessTokenValid({accessToken: accessToken(), refreshToken: refreshToken()})) {
                const newAccesstoken = await refreshAccessToken({accessToken: accessToken(), refreshToken: refreshToken()})
                setNullableAccessToken(newAccesstoken)
            }
            setAuthenticationState('authenticated')
        }
        something()
    }, [isAuthorized, accessToken, refreshToken, setNullableAccessToken])

    useEffect(() => {
        if (isAuthorized) {
            return
        }
        const something = async () => {
            const url = new URL(window.location.href)
            const code = url.searchParams.get("code")
            if (!code) {
                return undefined
            }
            const {accessToken, refreshToken} = await authenticateWithCode(code);
            setNullableAccessToken(accessToken)
            setNullableRefreshToken(refreshToken)
            setAuthenticationState('authenticated')
        }
        something()
    }, [isAuthorized, setNullableAccessToken, setNullableRefreshToken])

    const onClick = async () => {
        const url = await getAuthorizeURL()
        window.location.href = url;
    }

    if (authenticationState === 'loads') {
        return (<div>Loading...</div>)
    }

    if (authenticationState === 'needsAuthentication') {
        return (<div>
            <button onClick={onClick}>Redirect to spotify to authenticate</button>
        </div>)
    }   
    return <>{children}</>
}
