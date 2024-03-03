import 'antd/dist/antd.css';

import { history } from '@redux/configure-store';
import { Button, Grid, Modal, Result } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { modalContext } from './modal.helper';
import { ButtonModal } from '@components/index';
import { useDispatch } from 'react-redux';
import { feedbacksActions } from '@redux/feedbacks';

const { useBreakpoint } = Grid;

type ModalProps = {
    status: string,
    setOpenFeedModal: (openFeedModal: boolean) => void
}

const ModalComponent: React.FC<ModalProps> = ({ status, setOpenFeedModal }: ModalProps) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const { xs } = useBreakpoint();

    const context = useMemo(() => {
        if (status) {
            return modalContext.get(status);
        }
    }, [status]);

    const handleRedirect = useCallback(() => {
        dispatch(feedbacksActions.getFeedbacks())
        if (context?.redirectPath) history.push(context.redirectPath)
        setOpen(false)
    }, [context, dispatch])

    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <Modal
            centered
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
            width={xs ? 328 : 539}
        >
            {context && <Result
                status={context.status}
                title={context.title}
                subTitle={context.subTitle}
                extra={[
                    <Button
                        type="primary"
                        size="large"
                        key="console"
                        style={{ width: '100%' }}
                        onClick={handleRedirect}
                    >
                        {context.buttonText}
                    </Button>,
                    status === 'error' &&
                    <><ButtonModal setOpenFeedModal={setOpenFeedModal} dataId={'write-review-not-saved-modal'} />
                        <Button key='close' size="large" style={{ width: '100%' }}
                            onClick={() => setOpen(false)}>
                            Закрыть
                        </Button></>,
                ]} />}
        </Modal>
    );
};

export default ModalComponent