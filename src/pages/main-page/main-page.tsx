import React, { useState } from 'react';

import 'antd/dist/antd.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Image, Button } from 'antd';

import { menuItems } from '@constants/menu.constants';
import classes from './index.module.css';

const { Header, Sider, Content, Footer } = Layout;

export const MainPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>
        <Sider theme='light' width={208} trigger={null} collapsible collapsed={collapsed} style={{
          boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
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
        <Layout className={classes.site_layout}>
          <Header className={classes.header}>
            <Button className={classes.button_trigger}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: classes.trigger,
                onClick: () => setCollapsed(!collapsed),
              })}
            </Button>
          </Header>
          <Content
            className={classes.layout_background}
            style={{
              margin: '24px 16px',
              padding: 24,
            }}
          >
            Content
          </Content>
          <Footer />
        </Layout>
      </Layout >
    </>
  );
};
