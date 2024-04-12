import { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { useAtomValue, useSetAtom } from "jotai";
import {
  isAuthorizedAtom,
  accessTokenAtom,
  refreshTokenAtom,
  nullableAccessTokenAtom,
  nullableRefreshToken,
} from "../state/auth";
import { getAccessTokenStatus } from "../provider/accessTokenValid";
import { refreshAccessToken } from "../provider/refreshAccessToken";
import { authenticateWithCode } from "../provider/authenticate";
import { AuthenticationScreen } from "./AuthenticationScreen";
import { NotWhitelistedScreen } from "./NotWhitelistedScreen";

export const CONTACT_ADDRESS = "ow-ad+artist-lookup@simplelogin.co";

type State =
  | "loads"
  | "needsAuthentication"
  | "authenticated"
  | "notWhiteListed";

export const AuthenticationWrapper = ({
  children,
}: {
  children: any;
}): ReactElement => {
  const [authenticationState, setAuthenticationState] =
    useState<State>("loads");
  const isAuthorized = useAtomValue(isAuthorizedAtom);
  const accessToken = useAtomValue(accessTokenAtom);
  const refreshToken = useAtomValue(refreshTokenAtom);
  const setNullableAccessToken = useSetAtom(nullableAccessTokenAtom);
  const setNullableRefreshToken = useSetAtom(nullableRefreshToken);

  useEffect(() => {
    const something = async () => {
      if (!isAuthorized) {
        setAuthenticationState("needsAuthentication");
        return;
      }
      const tokenStatus = await getAccessTokenStatus({
        accessToken: accessToken(),
        refreshToken: refreshToken(),
      });
      if (tokenStatus === "expired") {
        const newAccesstoken = await refreshAccessToken({
          accessToken: accessToken(),
          refreshToken: refreshToken(),
        });
        setNullableAccessToken(newAccesstoken);
        return;
      }
      if (tokenStatus === "ok") {
        setAuthenticationState("authenticated");
      }
      if (tokenStatus === "forbidden") {
        setAuthenticationState("notWhiteListed");
      }
    };
    something();
  }, [isAuthorized, accessToken, refreshToken, setNullableAccessToken]);

  useEffect(() => {
    if (isAuthorized) {
      return;
    }
    const something = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      if (!code) {
        return undefined;
      }
      const { accessToken, refreshToken } = await authenticateWithCode(code);
      setNullableAccessToken(accessToken);
      setNullableRefreshToken(refreshToken);
      setAuthenticationState("authenticated");
    };
    something();
  }, [isAuthorized, setNullableAccessToken, setNullableRefreshToken]);

  if (authenticationState === "loads") {
    return <div />;
  }

  if (authenticationState === "notWhiteListed") {
    return <NotWhitelistedScreen />;
  }

  if (authenticationState === "needsAuthentication") {
    return <AuthenticationScreen />;
  }
  return children;
};
