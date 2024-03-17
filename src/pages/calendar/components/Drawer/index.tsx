import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Row, Col, Typography, Form, Drawer, Badge, Button, FormListFieldData, FormInstance } from 'antd';
import { EditOutlined, PlusOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { setColor } from '@pages/calendar/calendar.helper';
import { FormList } from '../Form-list';
import { TrainingResponse } from '@redux/training';

type PanelAddTrainingProps = {
  selectDate: Dayjs | undefined,
  showDrawer: boolean | TrainingResponse,
  form: FormInstance,
  userTraining: TrainingResponse[],
  setShowDrawer: (showDrawer: boolean) => void,
}

export const PanelAddTraining: React.FC<PanelAddTrainingProps> = ({
  selectDate, showDrawer, form, setShowDrawer
}) => {
  const [edit, setEdit] = useState(false);

  const exercisesList = form.getFieldValue('name')
  const trainingName = exercisesList && form.getFieldValue(['name', exercisesList.length - 1, 'name']);

  return (
    <Drawer
      data-test-id='modal-drawer-right'
      width={408}
      destroyOnClose
      title={
        <Row gutter={[0, 16]} >
          <Col span={2}>
            {edit ? <EditOutlined /> : <PlusOutlined />}
          </Col>

          <Col span={21}>
            <Typography.Text strong>Добавление упражнений</Typography.Text>
          </Col>

          <Col span={1}>
            <CloseOutlined data-test-id='modal-drawer-right-button-close' onClick={() => {
              setShowDrawer(false)
            }}
              style={{ color: 'var(--ant-text)', textAlign: 'end' }} />
          </Col>

          <Col flex='auto'>
            <Badge color={setColor(trainingName)} text={trainingName} style={{ color: 'var(--ant-text)' }} />
          </Col>

          <Col flex="85px">
            <Typography.Text type='secondary' style={{ fontSize: 'var(--font-size-base)' }}>
              {selectDate?.format('DD.MM.YYYY')}
            </Typography.Text>
          </Col>
        </Row>
      }
      placement="right" closable={false} onClose={() => setShowDrawer(false)} open={showDrawer as boolean} mask={false}>
      <Row>
        <Col span={24}>
          <Form
            form={form}
            size='middle'
            className={classes.drawer_form}
          >
            <Form.List name="name">
              {(fields) => (

                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>

                  {[fields[fields.length - 1]].map((field: FormListFieldData) => (

                    <Form.List key={field.key} name={[field.name, 'exercises']}>
                      {(subFields, { add }) => (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>

                          {subFields.map((subField) => (
                            <Row key={subField.key} align="middle" gutter={[0, 8]} style={{ marginBottom: 'calc(6 * var(--margin-space))' }}>
                              <FormList name={subField.name} />
                            </Row>
                          ))}

                          <div className={classes.drawer_button}>
                            <Button type="link" size='large' onClick={() => add()} block icon={<PlusOutlined />}>
                              Добавить ещё
                            </Button>
                            {edit &&
                              <Button type="text" size='large'
                                block icon={<MinusOutlined />}>
                                Удалить
                              </Button>}
                          </div>
                        </div>
                      )}

                    </Form.List>
                  ))}
                </div>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Drawer>
  )
};
