import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { ReactNode } from "react"

type ObjectResult = Record<string, ModalContext>

export type ModalContext = {
    title: ReactNode,
    buttonText: string,
    content: ReactNode,
    icon?: ReactNode,
    closeIcon?: ReactNode
}

const modal: ObjectResult = {
    '500': {
        title: <Typography.Text strong data-test-id='modal-error-user-training-title'>
            При открытии данных произошла ошибка
        </Typography.Text>,
        content: <Typography.Text type='secondary' data-test-id='modal-error-user-training-subtitle'>
            Попробуйте ещё раз
        </Typography.Text>,
        icon: <CloseCircleOutlined style={{ color: 'var(--ant-primary-6)' }} />,
        buttonText: 'Обновить',
        closeIcon: <CloseOutlined data-test-id='modal-error-user-training-button-close' />,
    },
    'error': {
        title: <Typography.Text strong data-test-id='modal-error-user-training-title'>
            При сохранении данных произошла ошибка
        </Typography.Text>,
        content: <Typography.Text type='secondary' data-test-id='modal-error-user-training-subtitle'>
            Придётся попробовать ещё раз
        </Typography.Text>,
        icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        buttonText: 'Закрыть',
    },
}

export const modalContext = new Map(Object.entries(modal))


