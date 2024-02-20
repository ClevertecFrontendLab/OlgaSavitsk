import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import { Content, Footer, Header, Sider } from './components';
import classes from './index.module.css';

export const MainPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>

        <Sider collapsed={collapsed} />

        <Layout className={classes.site_layout}>

          <Header getCollapted={setCollapsed} />

          <Content />

          <Footer />

        </Layout>
      </Layout >
    </>
  );
};
