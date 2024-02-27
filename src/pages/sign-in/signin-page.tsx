import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Image, Form, Input, Space, Grid, Checkbox } from "antd";
import { GooglePlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { authActions, selectPreviousLocations } from '@redux/auth';
import { Tabs } from '@components/index';
import { RoutePath } from '@constants/index';
import classes from './index.module.css';

const validateMessages = {
  required: '',
  types: {
    email: '${label} is not a valid email!',
  },
};

type SignInParams = {
  email: string,
  password: string,
  remember: boolean
}

const { useBreakpoint } = Grid;

export const SignIn: React.FC = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { xs } = useBreakpoint();

  const onFinish = useCallback(async (value: SignInParams) => {
    dispatch(authActions.signInRequest(value))
  }, [dispatch])

  const checkEmailHandle = useCallback((value: Pick<SignInParams, 'email'> | unknown) => {
    dispatch(authActions.checkEmailRequest(value))
  }, [dispatch])

  const previousLocations = selectPreviousLocations()

  const repeatedRequest = useCallback(() => {
    if (!previousLocations) return null
    const { pathname, state } = previousLocations
    if (pathname === RoutePath.CheckemailError) {
      checkEmailHandle(state)
    }
  }, [checkEmailHandle, previousLocations])

  useEffect(() => {
    repeatedRequest()
  }, [form, repeatedRequest])

  return (
    <Space direction="vertical" align="center" size={xs ? 32 : 48} className={classes.form_layout}
      style={{ width: '100%', textAlign: 'center' }}
      >
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
        <Tabs />

        <Form.Item
          name="email"
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input data-test-id='login-email' addonBefore="e-mail:" className={classes.input} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '' },
            { min: 8, message: '' },
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Пароль"
            data-test-id='login-password' />
        </Form.Item>
        <Form.Item className={classes.checkbox} shouldUpdate>
          {() => (
            <><Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
            </Form.Item>
              <Button
                data-test-id='login-forgot-button'
                type='link'
                onClick={() => {
                  form
                    .validateFields(['email'])
                    .then(value => {
                      form.resetFields();
                      checkEmailHandle(value)
                    }).catch(info => {
                      console.error(info);
                    });
                }
                }
              >
                Забыли пароль?
              </Button></>)}
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Space direction="vertical" align="center" size={16} className={classes.form_button__item}>
              <Button
                data-test-id='login-submit-button'
                type="primary"
                htmlType="submit"
                className={classes.form_button}
              >
                Войти
              </Button>
              <Button icon={xs ? '' : <GooglePlusOutlined />} style={{ width: '100%' }} className={classes.form_button}>
                Войти через Google
              </Button>
            </Space>
          )}
        </Form.Item>
      </Form>
    </Space>
  );
};