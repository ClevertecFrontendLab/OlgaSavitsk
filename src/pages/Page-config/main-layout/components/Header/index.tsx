import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { breadcrumbNameMap } from '@constants/index';
import { RoutePath } from '@constants/routes.constants';
import { selectLocationPath } from '@redux/auth';
import { Breadcrumb, Button, Grid, PageHeader, Typography } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { Title } = Typography;

const { useBreakpoint } = Grid;

type HeaderProps = {
  getCollapted: (collapsed: boolean) => void
}

export const HeaderComponent: React.FC<HeaderProps> = ({ getCollapted }: HeaderProps) => {
  const locationPathname = selectLocationPath();
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false);
  const { lg, md, xs } = useBreakpoint();
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/main">Главная</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <PageHeader
      breadcrumb={
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
      }
      ghost={false}
      className={classes.header}
      title={
        locationPathname === RoutePath.Home && <Title
          className={classes.header_title}
          >
          Приветствуем тебя в CleverFit — приложении,<br /> которое поможет тебе добиться своей мечты!
        </Title>}
      extra={locationPathname !== RoutePath.Feedbacks && [
        md ? <Button key={1} type="link" icon={lg ? <SettingOutlined /> : ''} size='small'>
          Настройки
        </Button> :
          <Button key={2} shape="circle" icon={<SettingOutlined />} />
      ]}
    >
      {xs ? <Button key={1} data-test-id='sider-switch-mobile' className={classes.button_trigger__mobile}
        style={{ left: xs ? 0 : 'auto', transform: xs && collapsed ? 'translateX(104px)' : 'none' }}>
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
  );
};
