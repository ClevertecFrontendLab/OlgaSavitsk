import React from 'react';
import { Layout, Space, Grid } from "antd";
import 'antd/dist/antd.css';

import classes from './index.module.css';
import { Outlet } from 'react-router-dom';

const { useBreakpoint } = Grid;


export const UnauthorizedLayout: React.FC = () => {
    const { xs } = useBreakpoint();
    return (
        <>
            <Layout className={classes.page_layout}>
                <div className={classes.page_wrapper}>
                    <Space direction="vertical" align="center" size={xs ? 32 : 48} className={classes.form_layout}>
                        <Outlet />
                    </Space>
                </div>
            </Layout >
        </>
    );
};