import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

export const SiderItems = [
  {
    title: 'Расписать тренировки',
    action: 'Тренировки',
    icon: <HeartFilled />,
    path: '#'
  },
  {
    title: 'Назначить календарь',
    action: 'Календарь',
    icon: <CalendarTwoTone twoToneColor={['#2F54EB', '#2F54EB']} />,
    path: '#',
  },
  {
    title: 'Заполнить профиль',
    action: 'Профиль',
    icon: <IdcardOutlined />,
    path: '#',
  },
];

export const CONTENT = {
  MAIN: <Typography.Text style={{ color: '#061178', fontSize: '16px', letterSpacing: '0.67px', lineHeight: '130%', textAlign: 'left' }}>
    <p>C CleverFit ты сможешь:</p>
    <p style={{ whiteSpace: 'pre-wrap' }}>— планировать свои тренировки на календаре, выбирая тип<wbr /> и уровень нагрузки;</p>
    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>— отслеживать свои достижения в разделе статистики, сравнивая свои результаты<wbr /> c нормами и рекордами;</p>
    <p style={{ whiteSpace: 'pre-wrap' }}>— создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы<wbr /> o тренировках;</p>
    <p style={{ overflowWrap: 'break-word' }}>— выполнять расписанные тренировки для разных частей тела, следуя подробным<wbr /> инструкциям и советам профессиональных тренеров.</p></Typography.Text>,
  SUBMAIN:
    <Typography.Title level={4} style={{ fontWeight: 500, lineHeight: '130%', letterSpacing: '0.5px', margin: 0, whiteSpace: 'pre-wrap', overflowWrap: 'break-word', textAlign: 'left' }}>
      CleverFit — это не просто приложение, а твой личный помощник
      в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!'</Typography.Title>,
};
