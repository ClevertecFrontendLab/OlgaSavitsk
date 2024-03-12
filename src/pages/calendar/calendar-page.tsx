import 'antd/dist/antd.css';
import 'dayjs/locale/ru';

import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { RoutePath } from '@constants/routes.constants';
import { history } from '@redux/configure-store';
import { selectError } from '@redux/error';
import { trainingActions } from '@redux/training';
import { Grid, Layout, Modal } from 'antd';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import locale from 'antd/lib/calendar/locale/ru_RU';
import dayjs from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import { useCallback, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

import classes from './index.module.css';


const Calendar = generateCalendar<dayjs.Dayjs>({
    ...dayjsGenerateConfig,
    locale: {
        ...dayjsGenerateConfig.locale,
        getWeekFirstDay: () => 1,
        getShortMonths: () => ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        getShortWeekDays: () => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    }
});

const { useBreakpoint } = Grid;

export const CalendarPage: React.FC = () => {
    const dispatch = useDispatch()
    const { statusCode } = selectError()
    const { xs } = useBreakpoint();

    const handleTrainingList = useCallback(() => {
        dispatch(trainingActions.getTrainingList())
    }, [dispatch])

    const error = useCallback(() => {
        Modal.error({
            title: <span data-test-id='modal-error-user-training-title'>При открытии данных произошла ошибка</span>,
            content: <span data-test-id='modal-error-user-training-subtitle'>Попробуйте ещё раз.</span>,
            icon: <CloseCircleOutlined style={{ color: 'var(--ant-primary-6)' }} />,
            okText: <span data-test-id='modal-error-user-training-button'>Обновить</span>,
            onOk() {
                handleTrainingList()
                history.push(RoutePath.Calendar)
            },
            okButtonProps: {
                type: "primary",
                size: "large"
            },
            closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
            closable: true,
            centered: true,
            className: classes.calendar_modal
        })
    }, [handleTrainingList]);


    useLayoutEffect(() => {
        if (statusCode) error()
    }, [error, statusCode])

    return (
        <><Layout className={classes.calendar_layout}>
            <Calendar
                locale={locale}
                onPanelChange={(data) => console.log(data)}
                className={classes.calendar}
                fullscreen={xs ? false : true}
            />
        </Layout>
        </>
    );
};
