import {
confirmLayout,
    LayoutType, RoutePath, } from "@constants/index";
import { RootState } from "@redux/configure-store";
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import ConfirmEmailPage from './confirm-email.page';
import ResetPasswordPage from './reset-password.page';

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