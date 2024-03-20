import 'antd/dist/antd.css';
import 'dayjs/locale/ru';

import { selectError } from '@redux/error';
import { Form, Grid, Layout, } from 'antd';
import locale from 'antd/lib/calendar/locale/ru_RU';
import { Dayjs } from 'dayjs';
import { useCallback, useLayoutEffect, useState } from 'react';

import classes from './index.module.css';
import {
  CalendarComponent,
  ModalErrorComponent,
  PanelAddTraining,
  TrainingList,
  TrainingModal
} from './components';
import { selectTraining, trainingActions } from '@redux/training';
import { useDispatch } from 'react-redux';
import { TrainingForm } from './types/index';

const { useBreakpoint } = Grid;

export const CalendarPage: React.FC = () => {
  const { statusCode } = selectError()
  const { trainings } = selectTraining()
  const [dateSelect, setValueselect] = useState<Dayjs>()
  const [openSelectModal, setOpenSelectModal] = useState(false)
  const [openTrainingModal, setOpenTrainingModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean | string>(false);
  const [form] = Form.useForm<TrainingForm>()
  const { xs, md } = useBreakpoint();
  const dispatch = useDispatch()

  const handleTrainingList = useCallback(() => {
    dispatch(trainingActions.getTrainingList())
  }, [dispatch])

  const dateCellRender = (cellValue: Dayjs) => {

    const trainingCorrespondDay = trainings
      .filter((training) => cellValue.isSame(training.date, 'day'))

    return (
      <>
        <TrainingModal
          openTrainingModal={openTrainingModal}
          openSelect={openSelectModal}
          userTraining={trainingCorrespondDay}
          cellValue={cellValue}
          selectDate={dateSelect}
          form={form}
          setOpenSelectModal={setOpenSelectModal}
          setOpenTrainingModal={(val) => setOpenTrainingModal(val)}
          setShowDrawer={setShowDrawer} />

        {md && <TrainingList userTraining={trainingCorrespondDay} />}
      </>
    );
  };

  useLayoutEffect(() => {
    if (statusCode) {
      ModalErrorComponent(handleTrainingList, statusCode)
      setOpenTrainingModal(false)
    }
  }, [handleTrainingList, statusCode])

  return (
    <>
      <Layout className={classes.calendar_layout}>
        <CalendarComponent
          locale={locale}
          className={classes.calendar}
          fullscreen={xs ? false : true}
          dateCellRender={(date) => {
            const tr = trainings.find(train => date.isSame(train.date, 'day'))
            return (
              <div className={tr?.isImplementation
                ? `${classes.training_exist} ${classes.done}`
                : tr
                  ? classes.training_exist : 'undefined'}>
                {dateCellRender(date)}
              </div>)
          }}
          onChange={() => {
            setOpenTrainingModal(false)
            setOpenSelectModal(false)
            setShowDrawer(false)
          }}
          onSelect={(date: Dayjs) => {
            setValueselect(date)
            setOpenTrainingModal(true)
          }}
        />
      </Layout>
      {showDrawer &&
        <PanelAddTraining
          selectDate={dateSelect}
          showDrawer={showDrawer}
          form={form}
          userTraining={trainings}
          setShowDrawer={setShowDrawer} />}
    </>
  );
};
