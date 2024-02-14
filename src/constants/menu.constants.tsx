import Icon, { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import IconExit from '@components/Icon-exit';
import { MenuProps } from 'antd';
import 'antd/dist/antd.css';

type MenuItem = Required<MenuProps>['items'][number] & {
    path: string;
    type?: string
};

export const menuItems: MenuItem[] = [
    { path: '', key: '1', label: 'Календарь', icon: <CalendarTwoTone twoToneColor={['#061178', '#061178']} /> },
    { path: '', key: '2', label: 'Тренировки', icon: <HeartFilled /> },
    { path: '', key: '3', label: 'Достижения', icon: <TrophyFilled /> },
    { path: '', key: '4', label: 'Профиль', icon: <IdcardOutlined /> },
    { path: '', key: '5', label: 'Выход', icon: <IdcardOutlined />, type: 'divider' },
    {
        path: '', key: '6', label: 'Выход', icon: <Icon component={IconExit} />
    },
];
