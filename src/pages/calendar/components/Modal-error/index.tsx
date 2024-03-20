import 'antd/dist/antd.css';

import classes from './index.module.css';
import { Modal, Typography } from 'antd';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { RoutePath } from '@constants/routes.constants';
import { history } from '@redux/configure-store';

export const ModalErrorComponent = (fn: () => void, statusCode: string) => {
    Modal.destroyAll()

    return statusCode === '500' ? Modal.error({
        title: <Typography.Text strong data-test-id='modal-error-user-training-title'>
            При открытии данных произошла ошибка
        </Typography.Text>,
        content: <Typography.Text type='secondary' data-test-id='modal-error-user-training-subtitle'>
            Попробуйте ещё раз
        </Typography.Text>,
        icon: <CloseCircleOutlined style={{ color: 'var(--ant-primary-6)' }} />,
        okText: <span data-test-id='modal-error-user-training-button'>
            'Обновить'
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
        bodyStyle: {
            padding: '32px'
        },
        maskStyle: {
            backdropFilter: 'blur(3px)',
            background: 'rgba(121, 156, 212, 0.1)'
        },
        className: classes.calendar_modal
    })
        : Modal.error({
            title: <Typography.Text strong data-test-id='modal-error-user-training-title'>
                При сохранении данных произошла ошибка
            </Typography.Text>,
            content: <Typography.Text type='secondary' data-test-id='modal-error-user-training-subtitle'>
                Придётся попробовать ещё раз
            </Typography.Text>,
            icon: <CloseCircleOutlined style={{ color: 'red' }} />,
            okText: <span data-test-id='modal-error-user-training-button'>
                'Закрыть'
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
            bodyStyle: {
                padding: '32px'
            },
            maskStyle: {
                backdropFilter: 'blur(3px)',
                background: 'rgba(121, 156, 212, 0.1)'
            },
            className: classes.calendar_modal
        })
};
