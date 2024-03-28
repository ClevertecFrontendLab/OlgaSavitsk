import { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { FormAuthList } from '@components/form-auth-list';
import { selectError } from '@redux/error';
import { selectUserState, userActions, UserPayload } from '@redux/user';
import { Alert, Button, Col, DatePicker, Form, Grid, Input, Layout, Modal, Row, Typography, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile, UploadFileStatus } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import dayjs from 'dayjs';

import { ModalErrorComponent } from './components';

import 'antd/dist/antd.css';
import classes from './index.module.css';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const { user } = selectUserState()
  const { statusCode } = selectError()
  const { xs } = Grid.useBreakpoint();
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [error, setError] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>(user && user.imgSrc ?
    [{
      uid: '1',
      name: previewTitle,
      status: 'done',
      url: user.imgSrc,
    }] : []);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    const fileUploaded = { ...file }

    if (!fileUploaded.url && !fileUploaded.preview) {
      fileUploaded.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(fileUploaded.url || (fileUploaded.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      fileUploaded.name || fileUploaded.url!.substring(fileUploaded.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = useCallback(({ fileList: newList, file }: UploadChangeParam) => {
    setComponentDisabled(false)
    if (file.status === 'removed') {
      dispatch(userActions.putUserRequest({ ...user, imgSrc: '' }))
    }
    setFileList(newList);
  }, [dispatch, user])

  const onFinish = useCallback(async (val: Partial<UserPayload>) => {
    dispatch(userActions.putUserRequest(val))
    if (user) {
      form.setFieldsValue({ ...user, birthday: dayjs(user.birthday) })
      setError('success')
      setComponentDisabled(true)
    }
  }, [dispatch, form, user])

  const customRequest = useCallback(async ({ file }: any) => {
    dispatch(userActions.uploadFileRequest(file))
  }, [dispatch]);

  const cancelModalError = useCallback(() => {
    setFileList([])
  }, [])

  useEffect(() => {
    if (user) {
      form.setFieldsValue({ ...user, birthday: user.birthday && dayjs(user.birthday) })
      setFileList([...fileList.map((file) => (
        {
          ...file,
          status: 'done' as UploadFileStatus,
          url: user.imgSrc
        }))])
    }
    // }
    // if (progress) {
    //   setProgressPercent(progress)
    //   setFileList([...fileList.map((file) => (
    //     {
    //       ...file,
    //       percent: progress,
    //       status: progress === 100 ? 'done' : 'uploading' as UploadFileStatus
    //     }))])
    // }
    if (statusCode) {
      ModalErrorComponent(cancelModalError, statusCode)
      setFileList([{
        uid: '2',
        name: 'image.png',
        status: 'error',
      }])
      setComponentDisabled(true)
    }
  }, [form, user, statusCode, cancelModalError])

  const uploadButton = (
    <div>
      {xs ? <Button block={true} icon={<UploadOutlined style={{ color: 'var(--ant-text)' }} />}>Загрузить</Button> :
        <Fragment>
          <PlusOutlined /><div className={classes.upload_button}>Загрузить фото профиля</div>
        </Fragment>}
    </div>
  );

  return (
    <Layout className={classes.profile_layout}>
      <Form
        form={form}
        labelCol={{ flex: '50%' }}
        name="normal_login"
        className={classes.profile_form}
        onFinish={onFinish}
        size='large'
        onValuesChange={onFormLayoutChange}
      >
        <Row gutter={[24, { xs: 18, lg: 16 }]}>
          <Col span={24}>
            <Typography.Title level={5}>Личная информация</Typography.Title>
          </Col>
          <Col lg={{ span: 6, order: 1 }} xs={{ span: 24, order: 2 }}>
            <Form.Item
              data-test-id='profile-avatar'
              name="imgSrc"
              label={xs ? <span>Загрузить фото профиля:</span> : ''}
              className={classes.upload_item}
            >
              <Upload
                listType={xs ? 'picture' : 'picture-card'}
                fileList={fileList}
                customRequest={customRequest}
                onPreview={handlePreview}
                onChange={handleChange}
                progress={{
                  strokeColor: 'var(--ant-primary-6)',
                  strokeWidth: 2,
                  showInfo: false,
                }}
                style={{ width: '100%' }}
              >
                {fileList.length ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>

            </Form.Item>
          </Col>

          <Col lg={{ span: 18, order: 1 }} xs={{ span: 24 }}>
            <Form.Item
              data-test-id='profile-name'
              name="firstName">
              <Input
                placeholder='Имя'
                autoComplete='off' />
            </Form.Item>
            <Form.Item
              data-test-id='profile-surname'
              name="lastName">
              <Input

                placeholder='Фамилия'
                autoComplete='off' />
            </Form.Item>

            <Form.Item
              name="birthday">
              <DatePicker
                data-test-id='profile-birthday'
                placeholder='Дата рождения'
                format='DD.MM.YYYY'
                style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col span={24} order={3}>
            <Typography.Title level={5}>Приватность и авторизация</Typography.Title>
          </Col>
          <Col span={24} order={4}>
            <FormAuthList />
          </Col>
          <Col span={24} order={5}>
            <Form.Item shouldUpdate={true}>
              {() => (
                <Button
                  data-test-id='profile-submit'
                  type="primary"
                  htmlType="submit"
                  block={xs}
                  disabled={componentDisabled}
                >
                  Сохранить изменения
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {error && <Alert
        data-test-id='alert'
        message="Данные профиля успешно обновлены"
        type="success"
        showIcon={true}
        closable={true}
      />}
    </Layout >
  )
};
