import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Space, Input, Col, Tag, InputNumber, Typography, Form } from 'antd';

type ModalListProps = {
    name: number
}

export const FormList: React.FC<ModalListProps> = ({ name }: ModalListProps) => (
    <>
        <Col span={24}>
            <Form.Item
                name={[name, 'name']}
            >
                <Input data-test-id={`modal-drawer-right-input-exercise${name}`} placeholder='Упражнение' />
            </Form.Item>
        </Col>
        <Col span={8}>
            <Form.Item>
                <Space direction='vertical'>
                    <Tag color="default">Подходы</Tag>
                    <Form.Item
                        name={[name, 'approaches']}
                    >
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-approach${name}`}
                            addonBefore="+"
                            min={1}
                            placeholder='1' />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Col>
        <Col lg={{ span: 6, offset: 3 }}>
            <Form.Item>
                <Space direction='vertical'>
                    <Tag color="default">Вес, кг</Tag>
                    <Form.Item
                        name={[name, 'weight']}
                    >
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-weight${name}`}
                            min={0}
                            placeholder='0' />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Col>
        <Col span={1}>
            <Typography.Text
                type='secondary'
                className={classes.formlist_sign}>
                x</Typography.Text>
        </Col>
        <Col lg={{ span: 6 }}>
            <Form.Item>
                <Space direction='vertical'>
                    <Tag color="default">Количество</Tag>
                    <Form.Item
                        name={[name, 'replays']}
                    >
                        <InputNumber
                            data-test-id={`modal-drawer-right-input-quantity${name}`}
                            min={1} placeholder='3' />
                    </Form.Item>
                </Space>
            </Form.Item>
        </Col>
    </>
)
