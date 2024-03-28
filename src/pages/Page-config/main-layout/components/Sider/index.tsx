import { menuItems } from '@constants/index';
import { history } from '@redux/configure-store';
import { Grid, Image, Layout, Menu } from 'antd';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

type SiderProps = {
  collapsed: boolean
}

export const SiderComponent: React.FC<SiderProps> = ({ collapsed }: SiderProps) => {
  const { xs } = useBreakpoint();

  const imgSize = xs ? 72 : 133

  return (
    <Sider
      theme='light'
      collapsedWidth={xs ? 0 : 64}
      width={xs ? 106 : 208}
      trigger={null}
      collapsible={true}
      collapsed={collapsed}
      className={classes.sider}
      style={{
        position: xs ? 'fixed' : 'sticky',
        top: 0,
      }}
    >
      <div className={collapsed ? classes.collapsed : classes.logo}>
        <Image
          src={collapsed ? '../fit.svg' : '../logo.svg'}
          preview={false}
          width={collapsed ? 28 : imgSize}
          alt='logo'
        />
      </div>

      <Menu
        theme='light'
        mode='inline'
        onClick={({ key }) => history.push(key)}
        items={menuItems}
      />
    </Sider>
  );
};
