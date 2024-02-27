import { Suspense, useEffect } from 'react';
import { Outlet } from "react-router-dom";

import {
    DEFAULT_STORAGE_CONFIG,
    LocalStorageKey,
    RoutePath,
} from "@constants/index";
import { useStorage } from "@hooks/index";
import { history } from "@redux/configure-store";


const PageConfig = () => {
    const [token] = useStorage(
        LocalStorageKey.authToken,
        DEFAULT_STORAGE_CONFIG,
    );

    useEffect(() => {
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