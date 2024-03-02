import 'antd/dist/antd.css';

import { Grid, Layout } from 'antd';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header, Sider } from './components';
import classes from './index.module.css';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const { xs } = useBreakpoint();

    return (
        <>
            <Layout>
                <Sider collapsed={collapsed} />
                <Layout className={classes.site_layout}>
                    <Header getCollapted={setCollapsed} />
                    <Content
                        className={classes.layout_background}
                        style={{
                            padding: xs ? '24px 16px 0' : 24,
                        }}
                    >

                        <Outlet />

                    </Content>
                    <Footer />
                </Layout>
            </Layout >
        </>
    );
}