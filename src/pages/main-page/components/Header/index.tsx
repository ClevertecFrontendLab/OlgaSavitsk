import React, { useState } from 'react';
import { Button, PageHeader, Typography, Grid } from 'antd';
import { SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import classes from './index.module.css';

const { Title } = Typography;

const { useBreakpoint } = Grid;

interface HeaderProps {
  getCollapted: (collapsed: boolean) => void
}

const HeaderComponent: React.FC<HeaderProps> = ({ getCollapted }: HeaderProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { lg, md, xs } = useBreakpoint();

  return (
    <>
      <PageHeader
        className={classes.header}
        breadcrumb={{
          routes: [{
            path: '/',
            breadcrumbName: 'Главная',
          }]
        }}
        title={
          <Title
            style={{
              whiteSpace: 'pre-line',
              margin: 0,
              letterSpacing: lg ? '0.7px' : '0.25px',
              fontWeight: lg ? 700 : 500,
              lineHeight: '130%'
            }}
            level={lg ? 1 : xs ? 4 : 3}>
            Приветствуем тебя в CleverFit — приложении,<br /> которое поможет тебе добиться своей мечты!
          </Title>}
        extra={[
          md ? <Button key={1} type="link" icon={lg ? <SettingOutlined /> : ''} size='small'>
            Настройки
          </Button> :
            <Button key={2} shape="circle" icon={<SettingOutlined />} />
        ]}
      >
        {xs ? <Button key={1} data-test-id='sider-switch-mobile' className={classes.button_trigger__mobile}
          style={{left: xs ? 105 : 'auto', transform: xs && collapsed ? 'translateX(-104px)' : 'none' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: classes.trigger,
            onClick: () => {
              setCollapsed(!collapsed)
              getCollapted(!collapsed)
            },
          })}
        </Button> :
          <Button key={2} data-test-id='sider-switch' className={classes.button_trigger}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: classes.trigger,
              onClick: () => {
                setCollapsed(!collapsed)
                getCollapted(!collapsed)
              },
            })}
          </Button>}
      </PageHeader>
    </>
  );
};

export default HeaderComponent