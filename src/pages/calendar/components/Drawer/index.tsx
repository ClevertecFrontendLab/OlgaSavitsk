import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Row, Col, Typography, Form, Drawer, Badge, Button, FormListFieldData, FormInstance, Grid } from 'antd';
import { EditOutlined, PlusOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { setColor } from '@pages/calendar/calendar.helper';
import { FormList } from '../Form-list';
import { TrainingResponse } from '@redux/training';
import { DRAWER_MODE } from '../Calendar/constants/trainings';

type PanelAddTrainingProps = {
  selectDate: Dayjs | undefined,
  showDrawer: boolean | string,
  form: FormInstance,
  userTraining: TrainingResponse[],
  setShowDrawer: (showDrawer: boolean) => void,
}

export const PanelAddTraining: React.FC<PanelAddTrainingProps> = ({
  selectDate, showDrawer, form, setShowDrawer
}) => {
  const [checked, setChecked] = useState<{ isChecked: boolean, name: number }>(
    { isChecked: false, name: 0 }
  );
  const { xs } = Grid.useBreakpoint();

  const exercisesList = form.getFieldValue('trainings')
  const trainingName = exercisesList && form.getFieldValue(['trainings', exercisesList.length - 1, 'name']);

  return (
    <Drawer
      data-test-id='modal-drawer-right'
      width={xs ? 360 : 408}
      destroyOnClose
      bodyStyle={{ padding: xs ? '16px' : '24px' }}
      placement="right"
      closable={false}
      onClose={() => setShowDrawer(false)}
      open={showDrawer as boolean} mask={false}
      className={classes.drawer}
      title={
        <Row gutter={[0, 16]} >
          <Col span={2}>
            {showDrawer === DRAWER_MODE.edit ? <EditOutlined /> : <PlusOutlined />}
          </Col>

          <Col span={21}>
            <Typography.Text strong>
              {showDrawer === DRAWER_MODE.edit ? 'Редактирование' : 'Добавление упражнений'}
            </Typography.Text>
          </Col>

          <Col span={1}>
            <CloseOutlined data-test-id='modal-drawer-right-button-close'
              onClick={() => {
                setShowDrawer(false)
              }}
              style={{ color: 'var(--ant-text)', textAlign: 'end' }} />
          </Col>

          <Col flex='auto'>
            <Badge color={setColor(trainingName)}
              text={trainingName}
              style={{ color: 'var(--ant-text)' }} />
          </Col>

          <Col flex="85px">
            <Typography.Text type='secondary' style={{ fontSize: 'var(--font-size-base)' }}>
              {selectDate?.format('DD.MM.YYYY')}
            </Typography.Text>
          </Col>
        </Row>
      }
    >
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Form
            form={form}
            size='middle'
            className={classes.drawer_form}
          >
            <Form.List name="trainings">
              {(fields) => (
                <>
                  {[fields[fields.length - 1]].map((field: FormListFieldData) => (

                    <Form.List key={field.key} name={[field.name, 'exercises']}>
                      {(subFields, { add, remove }) => (
                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 24 }}>

                          {subFields.map((subField) => (
                            <Row key={subField.key} align="bottom" gutter={[0, 8]}>
                              <FormList name={subField.name} edit={showDrawer} setChecked={setChecked} />
                            </Row>
                          ))}

                          <div className={classes.drawer_button}>
                            <Button type="link" size='large'
                              onClick={() => add()} block icon={<PlusOutlined />}>
                              Добавить ещё
                            </Button>
                            {showDrawer === DRAWER_MODE.edit &&
                              <Button type="text" size='large'
                                disabled={!checked.isChecked}
                                block icon={<MinusOutlined />}
                                onClick={() => remove(checked?.name)}>
                                Удалить
                              </Button>}
                          </div>
                        </div>
                      )}
                    </Form.List>
                  ))}
                </>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Drawer>
  )
};
