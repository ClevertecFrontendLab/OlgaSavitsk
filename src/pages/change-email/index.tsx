import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import {
    LayoutType, RoutePath, confirmLayout,
} from "@constants/index";
import { RootState } from "@redux/configure-store";
import { ConfirmEmailPage } from '..';
import { ResetPasswordPage } from './reset-password.page';

const layoutComponent = {
    [LayoutType.CONFIRM]: ConfirmEmailPage,
    [LayoutType.RESET]: ResetPasswordPage
}

const ConfirmConfig = () => {
    const locationPathname = useSelector(({ router }: RootState) => router.location?.pathname)

    const { layout } = confirmLayout[locationPathname as RoutePath] || {}
    const Layout = layout ? layoutComponent[layout] : Fragment

    return (
        <Layout />
    )
}

export default ConfirmConfig