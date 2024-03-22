import { RoutePath } from '@constants/routes.constants';
import { history } from '@redux/configure-store';
import { Modal } from 'antd';

import { modal } from './modal-error.helper';

import 'antd/dist/antd.css';
import classes from './index.module.css';

export const ModalErrorComponent = (fn: () => void, statusCode: string) => {
    Modal.destroyAll()

    const modalContext = new Map(Object.entries(modal))
    const context = modalContext.get(statusCode);

    return Modal.error({
        title: context?.title,
        content: context?.content,
        icon: context?.icon,
        okText: <span data-test-id='modal-error-user-training-button'>
            {context?.buttonText}
        </span>,
        onOk() {
            fn()
            history.push(RoutePath.Calendar)
        },
        okButtonProps: {
            type: 'primary',
            size: 'large'
        },
        closeIcon: context?.closeIcon,
        closable: true,
        centered: true,
        bodyStyle: {
            padding: 'calc(8 * var(--margin-space))'
        },
        maskStyle: {
            backdropFilter: 'blur(3px)',
            background: 'rgba(121, 156, 212, 0.1)'
        },
        className: classes.calendar_modal
    })
};
