import 'antd/dist/antd.css';

import { menuItems } from '@constants/index';
import { history } from "@redux/configure-store";
import { Grid, Image, Layout, Menu } from 'antd';

import classes from './index.module.css';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

type SiderProps = {
  collapsed: boolean
}

export const SiderComponent: React.FC<SiderProps> = ({ collapsed }: SiderProps) => {
  const { lg, xs } = useBreakpoint();

  return (
    <Sider
      theme='light'
      collapsedWidth={lg ? 64 : xs ? 0 : 64}
      width={xs ? 106 : 208}
      trigger={null}
      collapsible={false}
      collapsed={collapsed}
      className={classes.sider}
      style={{
        position: xs ? 'fixed' : 'sticky',
        width: xs && collapsed ? '105px' : 'auto',
        top: 0,
        left: xs && collapsed ? 0 : xs && !collapsed ? '-105px' : 0
      }}
    >
      <div className={collapsed ? classes.collapsed : classes.logo}>
        <Image
          src={collapsed ? "../fit.svg" : '../logo.svg'}
          preview={false}
          width={xs ? 72 : collapsed ? 28 : 133}
          alt='logo'
        />
      </div>

      <Menu
        theme='light'
        onClick={({ key }) => history.push(key)}
        items={menuItems}
      />
    </Sider>
  );
};
