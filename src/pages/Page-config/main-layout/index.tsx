import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { Footer, Header, Sider } from '@pages/main-page/components';
import { RootState } from '@redux/configure-store';
import { authActions } from '@redux/auth';
import classes from './index.module.css';

export function MainLayout() {
    const isLoading = useSelector(({ authStore }: RootState) => authStore.isLoading)
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        if (isLoading) {
            dispatch(authActions.resetLoading(false))
        }
    }, [dispatch, isLoading])

    return (
        <>
            {!isLoading && <Layout>
                <Sider collapsed={collapsed} />
                <Layout className={classes.site_layout}>
                    <Header getCollapted={setCollapsed} />

                    <Outlet />

                    <Footer />
                </Layout>
            </Layout >
            }
        </>
    );
}