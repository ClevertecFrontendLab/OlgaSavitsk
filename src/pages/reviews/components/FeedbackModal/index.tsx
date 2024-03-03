import 'antd/dist/antd.css';

import { Button, Form, Input, Modal } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { RateComponent } from '@components/index';
import classes from './index.module.css';
import { feedbacksActions } from '@redux/feedbacks';

const { TextArea } = Input;

type FeedbackParams = {
    message: string,
    rating: number,
}

type FeedbackModalProps = {
    isOpen: boolean,
    setOpenFeedModal: (openFeedModal: boolean) => void,
}

const FeedbackModalComponent: React.FC<FeedbackModalProps> = ({ isOpen, setOpenFeedModal }: FeedbackModalProps) => {
    const dispatch = useDispatch()
    const [isError, setError] = useState(false);
    const [form] = Form.useForm();

    const formVal = Form.useWatch([], form)

    const handleForm = useCallback(() => {
        form.submit()
    }, [form])

    const onFinish = useCallback(async (value: FeedbackParams) => {
        dispatch(feedbacksActions.postFeedbackRequest(value))
        setOpenFeedModal(false)
    }, [dispatch, setOpenFeedModal])

    useEffect(() => {
        form.validateFields().then((val) => setError(!Object.values(val).length))
            .catch(() => setError(true))
    }, [form, formVal])

    return (

        <Modal
            centered
            title="Ваш отзыв"
            open={isOpen}
            onCancel={() => setOpenFeedModal(false)}
            footer={[
                isError ? <Button key="ok" disabled size='large'
                >
                    Опубликовать
                </Button> :
                    <Button
                        data-test-id='new-review-submit-button'
                        key="ok" type="primary" size='large'
                        onClick={handleForm}>
                        Опубликовать
                    </Button>,
            ]}
            width={539}
            maskStyle={{
                backdropFilter: 'blur(3px)',
                background: 'rgba(121, 156, 212, 0.1)'
            }}
            className={classes.modal_form}
        >
            <Form
                form={form}
                name="normal_login"
                onFinish={onFinish}
                size='large'
            >
                <Form.Item
                    name="rating"
                    rules={[
                        { required: true, message: '' },
                    ]}
                >
                    <RateComponent disabled={false} setRating={(rate) => form.setFieldValue('rating', rate)} />
                </Form.Item>
                <Form.Item
                    name="message"
                >
                    <TextArea placeholder="Autosize height based on content lines" autoSize={{ minRows: 1, maxRows: 6 }} />
                </Form.Item>
            </Form>
        </Modal>

    );
};

export default FeedbackModalComponent