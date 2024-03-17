import 'antd/dist/antd.css';
import classes from './index.module.css';

import { Badge } from 'antd';
import { TrainingResponse } from '@redux/training';
import { EditTwoTone } from '@ant-design/icons';
import { setColor } from '@pages/calendar/calendar.helper';


type TrainingListProps = {
  userTraining: TrainingResponse[]
  openTrainingModal?: boolean,
  setShowDrawer: (item: TrainingResponse) => void,
}

export const TrainingList: React.FC<TrainingListProps> = ({
  userTraining,
  openTrainingModal,
  setShowDrawer
}) => {

  return (
    <ul className={classes.events}>
      {userTraining.map((item, index) =>

      (<li key={item._id}
        style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Badge color={setColor(item.name)}
          text={item.name} />

        {openTrainingModal && <EditTwoTone data-test-id={`modal-update-training-edit-button${index}`} onClick={() => setShowDrawer(item)}/>}

      </li>)
      )}
    </ul>
  )
};
