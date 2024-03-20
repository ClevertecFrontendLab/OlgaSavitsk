import 'antd/dist/antd.css';

import { TrainingResponse } from '@redux/training';
import { Dayjs } from 'dayjs';
import { CreateTrainingModal } from './components/Modal-create-training';
import { SelectTrainingModal } from './components/Modal-select';
import { FormInstance } from 'antd';
import { TrainingForm } from '@pages/calendar/types';
import { useState } from 'react';


type TrainingModalProps = {
    userTraining: TrainingResponse[]
    cellValue: Dayjs,
    selectDate: Dayjs | undefined,
    openTrainingModal: boolean,
    openSelect: boolean,
    form: FormInstance<TrainingForm>
    setOpenTrainingModal: (openTrainingModal: boolean) => void,
    setOpenSelectModal: (openSelectModal: boolean) => void,
    setShowDrawer: (showDrawer: boolean | string) => void,
}

export const TrainingModal: React.FC<TrainingModalProps> = ({
    userTraining,
    cellValue,
    selectDate,
    openTrainingModal,
    openSelect,
    form,
    setOpenSelectModal,
    setOpenTrainingModal,
    setShowDrawer,
}) => {
    const [editTraining, setEditTraining] = useState<TrainingResponse>()

    return (
        (cellValue.isSame(selectDate, 'day') &&
            <>
                {openSelect ? <SelectTrainingModal
                    userTraining={userTraining}
                    openSelectModal={openSelect}
                    form={form}
                    selectDate={selectDate}
                    editTraining={editTraining}
                    setOpenSelectModal={setOpenSelectModal}
                    setOpenTrainingModal={setOpenTrainingModal}
                    setShowDrawer={setShowDrawer}
                /> :
                    openTrainingModal ? <CreateTrainingModal
                        userTraining={userTraining}
                        openTrainingModal={openTrainingModal}
                        selectDate={selectDate}
                        setOpenTrainingModal={setOpenTrainingModal}
                        setOpenSelectModal={setOpenSelectModal}
                        setEditTraining={setEditTraining}
                        setShowDrawer={setShowDrawer}
                    />
                        : null}
            </>
        )
    )
};