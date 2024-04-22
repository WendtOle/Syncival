import { useEffect } from "react";
import { authenticateWithCode } from "../provider/authenticate";
import {
  accessTokenAtom,
  authenticationAtom,
  nullableAccessTokenAtom,
  nullableRefreshTokenAtom,
  refreshTokenAtom,
} from "../state/auth";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getAccessTokenStatus } from "../provider/accessTokenValid";
import { refreshAccessToken } from "../provider/refreshAccessToken";

export const useAuthentication = () => {
  const [nullableAccessToken, setNullableAccessToken] = useAtom(
    nullableAccessTokenAtom
  );
  const [nullableRefreshToken, setNullableRefreshToken] = useAtom(
    nullableRefreshTokenAtom
  );
  const setAuthenticationState = useSetAtom(authenticationAtom);
  const accessToken = useAtomValue(accessTokenAtom);
  const refreshToken = useAtomValue(refreshTokenAtom);

  const url = new URL(window.location.href);

  useEffect(() => {
    const code = url.searchParams.get("code");
    if (!code) {
      return;
    }
    authenticateWithCode(code).then(({ accessToken, refreshToken }) => {
      setNullableAccessToken(accessToken);
      setNullableRefreshToken(refreshToken);
      setAuthenticationState("ok");
    });

    console.log({ code });
  }, [url]);

  useEffect(() => {
    if (!nullableAccessToken || !nullableRefreshToken) {
      return;
    }
    const run = async () => {
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
        setAuthenticationState("ok");
        return;
      }

      if (tokenStatus === "ok") {
        setAuthenticationState("ok");
        return;
      }
      if (tokenStatus === "forbidden") {
        setAuthenticationState("not-whitelisted");
      }
    };
    run();
  });
};
