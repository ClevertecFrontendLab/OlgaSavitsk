import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Button, Popover, Empty, Divider, FormInstance, Typography } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { Exercises, TrainingResponse, trainingActions } from '@redux/training';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TrainingForm, TrainingFormValue } from '@pages/calendar/types';
import { Dayjs } from 'dayjs';
import { createdTraining } from './helper.modal-training';
import { SelectForm } from './components/Select-form';

type CreateTrainingModalProps = {
  openSelectModal: boolean
  userTraining: TrainingResponse[]
  form: FormInstance<TrainingForm>,
  selectDate: undefined | Dayjs,
  setOpenSelectModal: (openSelectModal: boolean) => void,
  setOpenTrainingModal: (openTrainingModal: boolean) => void,
  setShowDrawer: (showDrawer: boolean) => void,
}

export const SelectTrainingModal: React.FC<CreateTrainingModalProps> = ({
  openSelectModal, userTraining, form, selectDate, setOpenSelectModal, setOpenTrainingModal, setShowDrawer
}) => {
  const dispatch = useDispatch()
  const [selectValue, setSelectValue] = useState('')
  const [error, setSelectError] = useState(true)

  const createdExercisesList: TrainingFormValue[] = form.getFieldValue('name')

  const setCreatedTraining = useMemo(() => {
    return createdTraining(createdExercisesList, selectValue, selectDate)
  }, [createdExercisesList, selectDate, selectValue])

  const createdExercises = useMemo(() => {
    return setCreatedTraining && setCreatedTraining
      .flatMap((training) => training.exercises)
      .filter((exercise: Exercises) => exercise.name)
  }, [setCreatedTraining])

  const onFinish = useCallback(async () => {
    const [createdTraining] = setCreatedTraining
    dispatch(trainingActions.postTrainingRequest(createdTraining))
    dispatch(trainingActions.getTraining())
    setOpenSelectModal(false)
    setOpenTrainingModal(true)
    form.resetFields()
    setSelectError(true)
  }, [createdTraining, dispatch, form])

  const onOpenDrawer = useCallback(() => {
    form.getFieldValue(['name']).map((_: TrainingFormValue, index: number) => {
      const currentSelectValue = form.getFieldValue(['name', index, 'name'])
      if (!currentSelectValue) {
        setSelectError(true)
      } else {
        setSelectError(false)
        setShowDrawer(true)
      }
    })
  }, [form, setShowDrawer])


  return (
    <Popover
      placement="bottomLeft"
      open={openSelectModal}
      overlayClassName={classes.overlay}
      title={
        <SelectForm
          userTraining={userTraining}
          form={form}
          setOpenSelectModal={setOpenSelectModal}
          setOpenTrainingModal={setOpenTrainingModal}
          setSelectError={setSelectError}
          setSelectValue={setSelectValue} />
      }
      content={
        <div data-test-id='modal-create-exercise'>
          <ul className={classes.events}>
            {createdExercises ? createdExercises.map((item: Exercises) =>

            (item.name && <li key={item.name}
              style={{ display: 'flex', justifyContent: 'space-between' }}>

              <Typography.Text type='secondary'>{item.name}</Typography.Text>
              <EditTwoTone onClick={() => setShowDrawer(true)} />

            </li>)
            )
              :
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 32,
                }}
                description={null}
              ></Empty>
            }
          </ul>

          <Divider style={{ margin: '12px 0' }} />

          <Button
            size='large'
            block
            onClick={onOpenDrawer}
            disabled={error}
          >
            Добавить упражнения
          </Button>
          <Button type='link' size='large'
            htmlType='submit'
            disabled={!createdExercisesList || !createdExercises.length}
            onClick={onFinish} style={{ width: '100%' }}
          >
            Сохранить
          </Button>
        </div>
      }
      className={classes.modal_training}
    />
  )
};
