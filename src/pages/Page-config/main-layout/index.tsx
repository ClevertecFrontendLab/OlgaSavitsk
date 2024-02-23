import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import { Footer, Header, Sider } from '@pages/main-page/components';
import classes from './index.module.css';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout>
                <Sider collapsed={collapsed} />
                <Layout className={classes.site_layout}>
                    <Header getCollapted={setCollapsed} />

                    <Outlet />

                    <Footer />
                </Layout>
            </Layout >
        </>
    );
};