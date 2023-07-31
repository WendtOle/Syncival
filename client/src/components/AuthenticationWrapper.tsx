import { ReactElement, useEffect, useState } from "react"
import { getAuthorizeURL } from "../provider/authorizeURL"
import "./App.css"
import { useAtomValue, useSetAtom } from "jotai"
import { isAuthorizedAtom, accessTokenAtom, refreshTokenAtom, nullableAccessTokenAtom, nullableRefreshToken } from "../state/auth"
import { isAccessTokenValid } from "../provider/accessTokenValid"
import { refreshAccessToken } from "../provider/refreshAccessToken"
import { authenticateWithCode } from "../provider/authenticate"
import { Button, Typography } from "@mui/material"

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
        return (<div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{display:"flex", flexDirection: "column", justifyContent: "space-evenly", height: "20vh", justifyItems: "baseline"}}>
            <Typography variant="h2" component="div" sx={{flexGrow: 1, letterSpacing: -4}}>Artist lookup</Typography>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>You need to be registered by me:</Typography>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Contact me through: ow-ad+artist-lookup@simplelogin.co</Typography>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>And you need to authenticate with spotify!</Typography>
            <Button variant="contained" onClick={onClick}>Authenticate</Button>
        </div>
            </div>)
    }   
    return <>{children}</>
}
