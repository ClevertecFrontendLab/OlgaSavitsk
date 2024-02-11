import React from 'react';
import { Layout, Menu, Image } from 'antd';
import 'antd/dist/antd.css';

import { menuItems } from '@constants/menu.constants';
import classes from './index.module.css';

const { Sider } = Layout;

interface SiderProps {
  collapsed: boolean
}

const SiderComponent: React.FC<SiderProps> = ({ collapsed }: SiderProps) => {
  return (
    <>
      <Sider
        theme='light'
        collapsedWidth={64}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={classes.sider}>
        <div className={collapsed ? classes.collapsed : classes.logo}>
          <Image
            src={collapsed ? "../fit.svg" : '../logo.svg'}
            preview={false}
            alt='logo'
          />
        </div>

        <Menu
          theme='light'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>
    </>
  );
};

export default SiderComponent