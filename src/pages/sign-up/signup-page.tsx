import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image, Form, Input, Tabs, Space, Grid } from "antd";
import { GooglePlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { signUpRequest } from '@redux/auth/actions';
import { RootState } from '@redux/configure-store';
import { PASSWORD_REGEX, RoutePath, TIPS, tabItems } from '@constants/index';
import classes from './index.module.css';

const validateMessages = {
  required: '',
};

type SignUpParams = {
  email: string,
  password: string,
  confirm?: string
}

const { useBreakpoint } = Grid;

export const SignUp: React.FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { xs } = useBreakpoint();

  const previousLocations = useSelector(({ router }: RootState) =>
    router.previousLocations?.find(location =>
      (location.location?.key !== router.location?.key)))

  const onFinish = useCallback(async (value: SignUpParams | unknown) => {
    dispatch(signUpRequest(value))
  }, [dispatch])

  const repeatedRequest = useCallback(() => {
    if (previousLocations?.location?.pathname === RoutePath.Error) {
      onFinish(previousLocations.location?.state)
    }
  }, [onFinish, previousLocations])

  useEffect(() => {
    repeatedRequest()
  }, [repeatedRequest])

  return (
    <Space direction="vertical" align="center" size={xs ? 32 : 48} style={{ width: '100%', textAlign: 'center' }}>
      <Image
        src='../logo.svg'
        preview={false}
        width={xs ? 203 : 309}
        alt='logo' /><Form
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
          help={TIPS}
          rules={[
            { required: true },
            {
              validator: (_, value) => PASSWORD_REGEX.test(value)
                ? Promise.resolve()
                : Promise.reject(new Error(TIPS))
            },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Пароль"
            data-test-id='registration-password' />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
              },
            }),
          ]}
        >
          <Input.Password
            data-test-id='registration-confirm-password'
            placeholder="Повторите пароль" />
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
                Регистрация через Google
              </Button>
            </Space>
          )}
        </Form.Item>
      </Form>
    </Space>
  );
};