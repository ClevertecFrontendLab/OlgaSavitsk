import 'antd/dist/antd.css';

import { TrainingResponse } from '@redux/training';
import { Dayjs } from 'dayjs';
import { CreateTrainingModal } from './components/Modal-create-training';
import { SelectTrainingModal } from './components/Modal-select';
import { FormInstance } from 'antd';
import { TrainingForm } from '@pages/calendar/types';


type TrainingModalProps = {
    userTraining: TrainingResponse[]
    cellValue: Dayjs,
    selectDate: Dayjs | undefined,
    openTrainingModal: boolean,
    openSelect: boolean,
    form: FormInstance<TrainingForm>
    setOpenTrainingModal: (openTrainingModal: boolean) => void,
    setOpenSelectModal: (openSelectModal: boolean) => void,
    setShowDrawer: (showDrawer: boolean | TrainingResponse) => void,
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
    setShowDrawer
}) => {

    return (

        (cellValue.isSame(selectDate, 'day') &&
            <>
                <CreateTrainingModal
                    openTrainingModal={openTrainingModal}
                    userTraining={userTraining}
                    selectDate={selectDate}
                    setOpenTrainingModal={setOpenTrainingModal}
                    setOpenSelectModal={setOpenSelectModal}
                    setShowDrawer={setShowDrawer}
                />
                <SelectTrainingModal
                    userTraining={userTraining}
                    openSelectModal={openSelect}
                    form={form}
                    selectDate={selectDate}
                    setOpenSelectModal={setOpenSelectModal}
                    setOpenTrainingModal={setOpenTrainingModal}
                    setShowDrawer={setShowDrawer}
                />
            </>
        )
    )
};