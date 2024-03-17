import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Divider, Select, Form, Space, FormInstance } from 'antd';
import { ArrowLeftOutlined, DownOutlined } from '@ant-design/icons';
import { TrainingResponse, selectTraining } from '@redux/training';
import { useMemo } from 'react';
import { TrainingForm, TrainingFormValue } from '@pages/calendar/types';
import { selectOptions } from '../../helper.modal-training';

type CreateTrainingModalProps = {
  userTraining: TrainingResponse[]
  form: FormInstance<TrainingForm>,
  setOpenSelectModal: (openSelectModal: boolean) => void,
  setOpenTrainingModal: (openTrainingModal: boolean) => void,
  setSelectError: (error: boolean) => void,
  setSelectValue: (selectValue: string) => void,
}

export const SelectForm: React.FC<CreateTrainingModalProps> = ({
  userTraining,
  form,
  setOpenSelectModal,
  setOpenTrainingModal,
  setSelectValue,
  setSelectError
}) => {
  const { trainingsList } = selectTraining()

  const createdExercisesList: TrainingFormValue[] = form.getFieldValue('name')

  const setSelectOptions = useMemo(() => {
    return selectOptions(userTraining, trainingsList)
  }, [trainingsList, userTraining])

  return (
    <div style={{ display: 'flex' }}>
      <Form
        form={form}
        size='middle'
        style={{ width: '100%' }}
        initialValues={{
          name: []
        }}
        className={classes.select_form}
      >
        <Form.Item>
          <Space style={{ width: '100%' }}>
            <ArrowLeftOutlined data-test-id='modal-exercise-training-button-close'
              onClick={() => {
                setOpenSelectModal(false);
                setOpenTrainingModal(true);
              }} />

            <Form.List name='name'>
              {(_subFields, { add }) => (
                <>
                  <Form.Item
                    name='name'
                    rules={[
                      { required: true, message: '' },
                    ]}
                    style={{ width: '100%', marginBottom: 0 }}
                  >
                    <Select
                      data-test-id='modal-create-exercise-select'
                      defaultValue={'Выбор типа тренировки'}
                      bordered={false}
                      suffixIcon={<DownOutlined />}
                      style={{ width: '100%' }}
                      onChange={(selectValue) => {
                        setSelectValue(selectValue);
                        setSelectError(false)
                        const existedTraining = createdExercisesList.filter(((exerc: TrainingFormValue) => exerc.name === selectValue))
                        if (existedTraining.length) {
                          form.setFieldsValue({ name: [...createdExercisesList, ...existedTraining] })
                        } else {
                          add({
                            name: selectValue,
                            exercises: [{
                              name: ''
                            }]
                          });
                        }
                      }}
                      options={setSelectOptions.map(
                        (training) => ({ label: training.name, value: training.name }))} />
                  </Form.Item></>
              )}
            </Form.List>
          </Space>
        </Form.Item>
        <Divider style={{ margin: '12px 0' }} />
      </Form >
    </div >
  )
};