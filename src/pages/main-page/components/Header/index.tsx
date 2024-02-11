import React, { useState } from 'react';
import { Button, PageHeader, Typography } from 'antd';
import { SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import classes from './index.module.css';

const { Title } = Typography;

interface HeaderProps {
  getCollapted: (collapsed: boolean) => void
}

const HeaderComponent: React.FC<HeaderProps> = ({ getCollapted }: HeaderProps) => {
  const [collapsed, setCollapsed] = useState(false);
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
        title={<Title style={{ whiteSpace: 'pre-line', margin: '0', letterSpacing: '1.5px', fontWeight: 700 }} level={1}>Приветствуем тебя в CleverFit — приложении,<br /> которое поможет тебе добиться своей мечты!</Title>}
        extra={[
          <Button type="text" icon={<SettingOutlined />} style={{ height: '22px' }} size='middle'>
            Настройки
          </Button>,
        ]}
      >
        <Button className={classes.button_trigger}>
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