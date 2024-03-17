import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Space, Typography, Button, Popover, Empty, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { TrainingResponse, selectTraining } from '@redux/training';
import dayjs, { Dayjs } from 'dayjs';
import { TrainingList } from '@pages/calendar/components';

type TrainingModalProps = {
  userTraining: TrainingResponse[]
  selectDate: Dayjs | undefined,
  openTrainingModal: boolean,
  setOpenSelectModal: (openSelectModal: boolean) => void,
  setOpenTrainingModal: (openTrainingModal: boolean) => void,
  setShowDrawer: (training: TrainingResponse) => void,
}

export const CreateTrainingModal: React.FC<TrainingModalProps> = ({
  userTraining,
  selectDate,
  openTrainingModal,
  setOpenSelectModal,
  setOpenTrainingModal,
  setShowDrawer
}) => {
  const { trainingsList } = selectTraining()

  const onClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenTrainingModal(false)
  }

  return (
    <Popover
      placement="bottomLeft"
      trigger='click'
      open={openTrainingModal}
      overlayClassName={classes.overlay}
      title={
        <Space direction='horizontal' align='start' size={'large'}>
          <Space direction='vertical' align='start' size={0}>
            <Typography.Text strong>
              Тренировки на {selectDate && selectDate.add(0, 'month').format('DD.MM.YYYY')}
            </Typography.Text>
          </Space>
          <CloseOutlined
            data-test-id='modal-create-training-button-close'
            onClick={onClose}
          />
        </Space>
      }
      content={
        <div data-test-id='modal-create-training'>
          {userTraining?.length ?
            <TrainingList
              userTraining={userTraining}
              openTrainingModal={openTrainingModal}
              setShowDrawer={setShowDrawer} />
            :
            <>
              <Typography.Text type="secondary" style={{ fontWeight: 'var(--font-weight-base)' }}>
                Нет активных тренировок
              </Typography.Text>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 32,
                  marginTop: '24px'
                }}
                description={null}
              ></Empty>
            </>
          }
          <Divider style={{ margin: '12px 0' }} />
          <Button
            type='primary'
            size='large'
            block
            disabled={userTraining?.length === trainingsList.length || selectDate?.isBefore(dayjs())}
            onClick={() => {
              setOpenTrainingModal(false)
              setOpenSelectModal(true)
            }}
          >Создать тренировку
          </Button>
        </div>}
      className={classes.modal_training}
    />
  )
};
