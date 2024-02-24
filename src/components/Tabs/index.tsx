import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs, Grid } from "antd";
import 'antd/dist/antd.css';

import { tabItems } from '@constants/index';
import { history } from "@redux/configure-store";
import { To } from 'history';

const { useBreakpoint } = Grid;

const TabsComponent: React.FC = () => {
    const { pathname } = useLocation()
    const { xs } = useBreakpoint();

    const onChange = useCallback((key: To) => {
        if (key !== pathname) {
            history.push(key)
        }
    }, [pathname]);

    return (
        <Tabs 
        onChange={onChange} 
        items={tabItems} 
        activeKey={pathname} 
        size={xs ? 'small' : 'middle'} />
    );
};

export default TabsComponent