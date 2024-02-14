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
  const { lg, xs } = useBreakpoint();
  console.log(useBreakpoint(), collapsed)
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
          lg ? <Button key={1} type="link" icon={lg ? <SettingOutlined /> : ''} size='small'>
            Настройки
          </Button> :
            <Button shape="circle" icon={<SettingOutlined />} />
        ]}
      >
        <Button className={classes.button_trigger} style={{ top: xs ? '3vh' : '47vh', left: xs ? 105 : 'auto', transform:  xs && collapsed ? 'translateX(-104px)' : 'none'}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: classes.trigger,
            onClick: () => {
              setCollapsed(!collapsed)
              getCollapted(!collapsed)
            },
          })}
        </Button>
      </PageHeader>
    </>
  );
};

export default HeaderComponent