import {
    DEFAULT_STORAGE_CONFIG,
    LocalStorageKey,
    RoutePath,
} from "@constants/index";
import { useStorage } from "@hooks/index";
import { history } from "@redux/configure-store";
import { Suspense, useCallback, useEffect } from 'react';
import { Outlet, useSearchParams } from "react-router-dom";


const PageConfig = () => {
    const [searchParams] = useSearchParams();
    const [token, setToken] = useStorage(
        LocalStorageKey.authToken,
        DEFAULT_STORAGE_CONFIG,
    );


    const googleAuth = useCallback(() => {
        const googleAuthToken = searchParams.get('accessToken');
        if (googleAuthToken) setToken({ access_token: googleAuthToken })
    }, [searchParams, setToken]);

    useEffect(() => {
        googleAuth()
        if (!token.access_token) {
            history.push(RoutePath.SignIn)
            return
        } else
            if (token.access_token) {
                history.push(RoutePath.Home)
                return
            }
    }, [token.access_token])

    return (
        <Suspense fallback={''}>
            <Outlet />
        </Suspense>
    )
}

export default PageConfig