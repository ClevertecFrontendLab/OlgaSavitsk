import 'antd/dist/antd.css';

import classes from './index.module.css';
import { Modal } from 'antd';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { RoutePath } from '@constants/routes.constants';
import { history } from '@redux/configure-store';

export const ModalErrorComponent = (fn: () => void, statusCode: string) => {

    Modal.destroyAll()
    return Modal.error({
        title: <span data-test-id='modal-error-user-training-title'>
            {statusCode === '500'
                ? 'При открытии данных произошла ошибка'
                : 'При сохранении данных произошла ошибка'}
        </span>,
        content: <span data-test-id='modal-error-user-training-subtitle'>
            {statusCode === '500' ? 'Попробуйте ещё раз.' : 'Придётся попробовать ещё раз'}
        </span>,
        icon: <CloseCircleOutlined style={{ color: 'var(--ant-primary-6)' }} />,
        okText: <span data-test-id='modal-error-user-training-button'>
            {statusCode === '500' ? 'Обновить' : 'Закрыть'}
        </span>,
        onOk() {
            fn()
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
};
