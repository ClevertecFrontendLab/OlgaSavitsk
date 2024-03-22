import generateCalendar from 'antd/es/calendar/generateCalendar';
import dayjs from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import 'antd/dist/antd.css';

import 'dayjs/locale/ru';

export const CalendarComponent = generateCalendar<dayjs.Dayjs>({
    ...dayjsGenerateConfig,
    locale: {
        ...dayjsGenerateConfig.locale,
        getWeekFirstDay: () => 1,
        getShortMonths: () => ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        getShortWeekDays: () => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    }
});
