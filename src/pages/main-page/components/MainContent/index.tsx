import React from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Grid, Layout, List, Space } from 'antd';

import classes from './index.module.css';
import { CONTENT, data } from '@constants/index';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const MainComponent: React.FC = () => {
  const { lg, xs } = useBreakpoint();
  return (
    <>
      <Content
        className={classes.layout_background}
        style={{
          padding: xs ? '24px 16px 0' : 24,
        }}
      >
        <Space direction="vertical" size="middle" style={{ maxWidth: lg ? '752px' : '100%', width: '100%' }}>
          <Space direction="vertical" size="large">

            <Card bordered={false} bodyStyle={{ paddingRight: lg ? '61px' : xs ? '24px' : '30px' }}>
              {CONTENT.MAIN}
            </Card>

            <Card bordered={false} bodyStyle={{ paddingRight: lg ? '61px' : '30px' }}>
              {CONTENT.SUBMAIN}
            </Card>

          </Space>
          <List
            grid={{ gutter: xs ? 6 : 16, column: 3, sm: 1, xs: 1 }}
            dataSource={data}
            renderItem={item => (
              <List.Item key={item.title}>
                <Card
                  hoverable
                  title={item.title}
                  headStyle={{ textAlign: (lg || xs) ? 'center' : 'left', fontSize: '17px', fontWeight: 400, whiteSpace: 'nowrap' }}
                  bodyStyle={{ padding: '10px 24px 13px', textAlign: 'center' }}>
                  <Button type='link' icon={item.icon} href={item.path} style={{ fontSize: '15px' }}>
                    {item.action}
                  </Button>
                </Card>
              </List.Item>
            )}
          />
        </Space>
      </Content>
    </>
  );
};

export default MainComponent