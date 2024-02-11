import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import { Header, Sider } from './components';
import classes from './index.module.css';

const { Content, Footer } = Layout;

export const MainPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>

        <Sider collapsed={collapsed} />
        
        <Layout className={classes.site_layout}>

          <Header getCollapted={setCollapsed} />
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
