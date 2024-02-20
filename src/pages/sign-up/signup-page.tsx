import React from 'react';
import { Button, Image, Form, Input, Layout, Tabs, Space, Grid } from "antd";
import { GooglePlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { PASSWORD_REGEX, TIPS, tabItems } from '@constants/index';
import classes from './index.module.css';

const validateMessages = {
  required: '',
};

const { useBreakpoint } = Grid;

export const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const { xs } = useBreakpoint();

  const onFinish = (value: unknown) => {
    console.log(value)
  }

  return (
    <>
      <Layout className={classes.page_layout}>
        <div className={classes.page_wrapper}>
          <Space direction="vertical" align="center" size={xs ? 32 : 48} className={classes.form_layout}>
            <Image
              src='../logo.svg'
              preview={false}
              width={xs ? 203 : 309}
              alt='logo'
            />
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
                <Input addonBefore="e-mail:" className={classes.input} />
              </Form.Item>

              <Form.Item
                name="password"
                help={TIPS}
                rules={[
                  { required: true },
                  {
                    validator: (_, value) =>
                      PASSWORD_REGEX.test(value)
                        ? Promise.resolve()
                        : Promise.reject(new Error(TIPS))
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Пароль"
                  data-test-id='registration-password'
                />
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
                  placeholder="Повторите пароль"
                />
              </Form.Item>

              <Form.Item shouldUpdate >
                {() => (
                  <Space direction="vertical" align="center" size={16} className={classes.form_button__item}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={classes.form_button}
                      disabled={!!form.getFieldsError().filter(({ errors }) => errors.length).length}
                    >
                      Войти
                    </Button>
                    <Button icon={<GooglePlusOutlined />} className={classes.form_button}>
                      Регистрация через Google
                    </Button>
                  </Space>
                )}
              </Form.Item>
            </Form>
          </Space>
        </div>
      </Layout >
    </>
  );
};