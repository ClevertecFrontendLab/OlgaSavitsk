import 'antd/dist/antd.css';

import { ButtonModal } from '@components/index';
import { history } from '@redux/configure-store';
import { Button, Grid, Modal, Result } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import classes from './index.module.css';
import { modalContext } from './modal.helper';

const { useBreakpoint } = Grid;

type ModalProps = {
    status: string,
    setOpenFeedModal?: (openFeedModal: boolean) => void
}

export const ModalComponent: React.FC<ModalProps> = ({ status, setOpenFeedModal }: ModalProps) => {
    const [open, setOpen] = useState(false);
    const { xs } = useBreakpoint();

    const context = useMemo(() => {
        if (status) {
            return modalContext.get(status);
        }
    }, [status]);

    const handleRedirect = useCallback(() => {
        if (context?.redirectPath) history.push(context.redirectPath)
        setOpen(false)
    }, [context])

    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <Modal
            data-test-id='modal-no-review'
            centered
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
            width={xs ? 328 : 539}
            closable={false}
            destroyOnClose
            bodyStyle={{ padding: xs ? '32px 16px' : '38px 85.5px' }}
            maskStyle={{
                backdropFilter: 'blur(4px)',
                background: 'rgba(121, 156, 212, 0.5)'
            }}
        >
            {context && <Result
                status={context.status}
                title={context.title}
                subTitle={context.subTitle}
                className={classes.modal}
                extra={[
                    status === 'error' ?
                        <><ButtonModal key='write'
                            style={{ width: '100%' }}
                            setOpenFeedModal={setOpenFeedModal}
                            setCloseModalError={(value) => setOpen(value)}
                            dataId={'write-review-not-saved-modal'} />
                            <Button key='close' size="large"
                                onClick={() => setOpen(false)}
                                style={{ width: '100%' }}>
                                Закрыть
                            </Button></>
                        : <Button
                            data-test-id={context.dataId}
                            type="primary"
                            size="large"
                            key="console"
                            style={{ width: status === '500' ? 'auto' : '100%' }}
                            onClick={handleRedirect}
                        >
                            {context.buttonText}
                        </Button>,
                ]} />}
        </Modal>
    );
};
