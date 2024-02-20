import React from 'react';
import { Layout } from "antd";
import 'antd/dist/antd.css';

import classes from './index.module.css';
import { Outlet } from 'react-router-dom';


export const UnauthorizedLayout: React.FC = () => {

    return (
        <>
            <Layout className={classes.page_layout}>
                <div className={classes.page_wrapper}>
                   <Outlet />
                </div>
            </Layout >
        </>
    );
};