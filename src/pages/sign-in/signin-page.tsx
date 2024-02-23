import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Image, Form, Input, Tabs, Space, Grid, Checkbox } from "antd";
import { GooglePlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { tabItems } from '@constants/index';
import classes from './index.module.css';

const validateMessages = {
  required: '',
};

type SignInParams = {
  email: string,
  password: string,
}

const { useBreakpoint } = Grid;

export const SignIn: React.FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { xs } = useBreakpoint();

  const onFinish = useCallback(async (value: SignInParams | unknown) => {
    // dispatch()
  }, [dispatch])

  return (
    <Space direction="vertical" align="center" size={xs ? 32 : 48} style={{ width: '100%', textAlign: 'center' }}>
      <Image
        src='../logo.svg'
        preview={false}
        width={xs ? 203 : 309}
        alt='logo' />
      <Form
        form={form}
        name="normal_login"
        className={classes.login_form}
        onFinish={onFinish}
        size='large'
        validateMessages={validateMessages}
      >
        <Tabs items={tabItems} size={xs ? 'small' : 'middle'} />

        <Form.Item
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input data-test-id='registration-email' addonBefore="e-mail:" className={classes.input} />
        </Form.Item>

        <Form.Item
          name="password"
        >
          <Input.Password
            type="password"
            placeholder="Пароль"
            data-test-id='registration-password' />
        </Form.Item>
        <Form.Item className={classes.checkbox}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Link to="">
            Забыли пароль?
          </Link>
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Space direction="vertical" align="center" size={16} className={classes.form_button__item}>
              <Button
                data-test-id='registration-submit-button'
                type="primary"
                htmlType="submit"
                className={classes.form_button}
                disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
              >
                Войти
              </Button>
              <Button icon={xs ? '' : <GooglePlusOutlined />} className={classes.form_button}>
                Войти через Google
              </Button>
            </Space>
          )}
        </Form.Item>
      </Form>
    </Space>
  );
};