import 'antd/dist/antd.css';

import Icon, { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { IconExit } from '@components/index';
import { MenuProps } from 'antd';

import { RoutePath } from './routes.constants';
import { LocalStorageKey } from './storage.constants';

type MenuItem = Required<MenuProps>['items'][number] & {
    path?: string;
    type?: string
};

export const menuItems: MenuItem[] = [
    {
        key: '1', label: 'Календарь', icon: <CalendarTwoTone
            twoToneColor={['var(--ant-primary-9)', 'var(--ant-primary-9)']} />
    },
    { key: '2', label: 'Тренировки', icon: <HeartFilled /> },
    { key: '3', label: 'Достижения', icon: <TrophyFilled /> },
    { key: '4', label: 'Профиль', icon: <IdcardOutlined /> },
    { key: '5', label: 'Выход', icon: <IdcardOutlined />, type: 'divider' },
    {
        key: RoutePath.SignIn, label: 'Выход', icon: <Icon component={IconExit} />,
        onClick: () => window.localStorage.removeItem(LocalStorageKey.authToken)
    },
];
