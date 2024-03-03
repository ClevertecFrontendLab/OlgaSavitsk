import 'antd/dist/antd.css';

import { MenuFoldOutlined,MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { RoutePath } from '@constants/routes.constants';
import { selectLocationPath } from '@redux/auth';
import { Button, Grid,PageHeader, Typography } from 'antd';
import React, { useState } from 'react';

import { routes } from './constants';
import classes from './index.module.css';

const { Title } = Typography;

const { useBreakpoint } = Grid;

type HeaderProps = {
  getCollapted: (collapsed: boolean) => void
}

const HeaderComponent: React.FC<HeaderProps> = ({ getCollapted }: HeaderProps) => {
  const locationPathname = selectLocationPath()
  const [collapsed, setCollapsed] = useState(false);
  const { lg, md, xs } = useBreakpoint();

  return (
    <>
      <PageHeader
        className={classes.header}
        breadcrumb={{
          routes: routes
        }}
        title={
          locationPathname === RoutePath.Home && <Title
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
        extra={locationPathname === RoutePath.Home && [
          md ? <Button key={1} type="link" icon={lg ? <SettingOutlined /> : ''} size='small'>
            Настройки
          </Button> :
            <Button key={2} shape="circle" icon={<SettingOutlined />} />
        ]}
      >
        {xs ? <Button key={1} data-test-id='sider-switch-mobile' className={classes.button_trigger__mobile}
          style={{ left: xs ? 105 : 'auto', transform: xs && collapsed ? 'translateX(-104px)' : 'none' }}>
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