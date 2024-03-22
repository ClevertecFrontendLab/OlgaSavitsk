import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { RoutePath } from '.';

export const SiderItems = [
  {
    title: 'Расписать тренировки',
    action: 'Тренировки',
    icon: <HeartFilled />,
    path: '#',
  },
  {
    title: 'Назначить календарь',
    action: 'Календарь',
    icon: <CalendarTwoTone twoToneColor={['#2F54EB', '#2F54EB']} />,
    path: RoutePath.Calendar,
    dataId: 'menu-button-calendar'
  },
  {
    title: 'Заполнить профиль',
    action: 'Профиль',
    icon: <IdcardOutlined />,
    path: '#',
  },
];

export const CONTENT = {
  MAIN: <Typography.Text style={{ color: '#061178', fontSize: '16px', lineHeight: '130%', textAlign: 'left' }}>
    <p>C CleverFit ты сможешь:</p>
    <p>— планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;</p>
    <p>— отслеживать свои достижения в разделе статистики, сравнивая свои результаты c нормами и рекордами;</p>
    <p>— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы o&nbsp;тренировках;</p>
    <p>— выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.</p></Typography.Text>,
  SUBMAIN:
    <Typography.Title level={4} style={{ fontWeight: 'var(--fw-m)', lineHeight: '130%', margin: 0, whiteSpace: 'pre-wrap', overflowWrap: 'break-word', textAlign: 'left' }}>
      CleverFit — это не просто приложение, а твой личный помощник
      в&nbsp;мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!</Typography.Title>,
};
