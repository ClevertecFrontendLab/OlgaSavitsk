import { ReactNode } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import { RoutePath } from './routes.constants';

export const breadcrumbNameMap: Record<string, string> = {
    '/feedbacks': 'Отзывы пользователей',
    '/calendar': 'Календарь',
};

type RoutesTitle = {
    [key in RoutePath]?: {
        title?: ReactNode;
        extra?: ReactNode | null
    };
};

export const headerTitle: RoutesTitle = {
    [RoutePath.Home]: {
        title: <Typography.Title>
            Приветствуем тебя в CleverFit — приложении,<br /> которое поможет тебе добиться своей мечты!
        </Typography.Title>,
        extra:
            <Button key={1} type="link" icon={<SettingOutlined data-header-title='home-title' />} size='small'>
                Настройки
            </Button>
    },
    [RoutePath.Profile]: {
        title: <Typography.Title level={4}>Профиль</Typography.Title>,
        extra: <Button key={1} type="link" icon={<SettingOutlined />} size='small'>
            Настройки
        </Button>
    },
    [RoutePath.Feedbacks]: {
        extra: null,
    },
};
