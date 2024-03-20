import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Space, Typography, Button, Popover, Empty, Divider, Grid } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { TrainingResponse, selectTraining } from '@redux/training';
import dayjs, { Dayjs } from 'dayjs';
import { ModalList } from '../Modal-list';

type TrainingModalProps = {
  userTraining: TrainingResponse[]
  selectDate: Dayjs | undefined,
  openTrainingModal: boolean,
  setOpenSelectModal: (openSelectModal: boolean) => void,
  setOpenTrainingModal: (openTrainingModal: boolean) => void,
  setEditTraining: (editTraining: TrainingResponse) => void,
  setShowDrawer: (showDrawer: boolean) => void,
}

export const CreateTrainingModal: React.FC<TrainingModalProps> = ({
  userTraining,
  selectDate,
  openTrainingModal,
  setOpenSelectModal,
  setOpenTrainingModal,
  setEditTraining,
}) => {
  const { trainingsList } = selectTraining()
  const { xs } = Grid.useBreakpoint();

  const onClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setOpenTrainingModal(false)
  }

  return (
    <Space >
      <Popover
        placement={xs ? 'bottom' : 'bottomLeft'}
        open={openTrainingModal}
        overlayClassName={classes.overlay}
        title={
          <Space direction='horizontal' align='start' size={30}>
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
              <ModalList
                userTraining={userTraining}
                setOpenSelectModal={setOpenSelectModal}
                setOpenTrainingModal={setOpenTrainingModal}
                setEditTraining={setEditTraining} />
              :
              <>
                <Typography.Text type="secondary" style={{ fontWeight: 'var(--font-weight-base)' }}>
                  Нет активных тренировок
                </Typography.Text>
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 32,
                    marginTop: 'calc(6 * var(--margin-space))'
                  }}
                  description={null}
                ></Empty>
              </>
            }
            <Divider style={{ marginTop: 'calc(3 * var(--margin-space))' }} />
            <Button
              type='primary'
              size='large'
              block
              disabled={
                userTraining?.length === trainingsList.length || selectDate?.isBefore(dayjs())}
              onClick={() => {
                setOpenTrainingModal(false)
                setOpenSelectModal(true)
              }}
            >Создать тренировку
            </Button>
          </div>}
        className={userTraining.length ? `${classes.modal_training} ${classes.training_exist}` : classes.modal_training}
      />
    </Space>
  )
};
