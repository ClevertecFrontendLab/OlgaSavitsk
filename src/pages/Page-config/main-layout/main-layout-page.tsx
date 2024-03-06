import 'antd/dist/antd.css';

import { Grid, Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { FooterComponent, HeaderComponent, SiderComponent } from './components';
import classes from './index.module.css';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const { xs } = useBreakpoint();

    return (
        <Layout>
            <SiderComponent collapsed={collapsed} />
            <Layout className={classes.site_layout}>
                <HeaderComponent getCollapted={setCollapsed} />
                <Content
                    className={classes.layout_background}
                    style={{
                        padding: xs ? '24px 16px 0' : 24,
                    }}
                >

                    <Outlet />

                </Content>
                <FooterComponent />
            </Layout>
        </Layout >
    );
}