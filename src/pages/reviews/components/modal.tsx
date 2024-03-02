import 'antd/dist/antd.css';

import { history } from '@redux/configure-store';
import { Button, Grid,Modal, Result } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { modalContext } from './modal.helper';

const { useBreakpoint } = Grid;

type ModalProps = {
    status: string
}

const ModalComponent: React.FC<ModalProps> = ({status}: ModalProps) => {  
    const [open, setOpen] = useState(false);
    const { xs } = useBreakpoint();

    const context = useMemo(() => {
        if (status) {
            return modalContext.get(status);
        }
    }, [status]);

    useEffect(() => {
        setOpen(true)
    }, [])

    return (
        <>
            <Modal
                centered
                open={open}
                footer={null}
                closable={false}
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
                            onClick={() => history.push(context.redirectPath)}
                        >
                            {context.buttonText}
                        </Button>,
                        status === 'error' &&
                        <Button key='close' size="large" style={{ width: '100%' }}
                            onClick={() => setOpen(false)}>
                            Закрыть
                        </Button>,
                    ]} />}
            </Modal>
        </>
    );
};

export default ModalComponent