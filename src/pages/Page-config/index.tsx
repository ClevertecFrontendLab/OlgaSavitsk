import { useEffect, Fragment } from 'react';
import { Outlet } from "react-router-dom";
import {
    DEFAULT_STORAGE_CONFIG,
    LayoutType,
    LocalStorageKey,
    RoutePath,
} from "@constants/index";
import { useStorage } from "@hooks/index";
import { history } from "@redux/configure-store";
import { MainLayout } from "./main-layout";
import { UnauthorizedLayout } from "./unauthorized-layout";

const layoutComponent = {
    [LayoutType.MAIN]: MainLayout,
    [LayoutType.UNAUTH]: UnauthorizedLayout
}

const PageConfig = () => {
    const [token] = useStorage(
        LocalStorageKey.authToken,
        DEFAULT_STORAGE_CONFIG,
    );

    // const locationPathname = useSelector(({ router }: RootState) => router.location?.pathname)
    // const { layout } = routesLayout[locationPathname as RoutePath] || {}
    // const Layout = layout ? layoutComponent[layout] : Fragment

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
        <Outlet />
    )
}

export default PageConfig