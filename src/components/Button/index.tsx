import { Button } from "antd"
import classes from './index.module.css';

type ButtonProps = {
    dataId: string;
    style?: React.CSSProperties,
    setOpenFeedModal: (openFeedModal: boolean) => void
}

const ButtonModal: React.FC<ButtonProps> = ({dataId, setOpenFeedModal, style} : ButtonProps) => {

    return (
        <Button
            data-test-id={dataId}
            type="primary"
            size='middle'
            style={style}
            className={classes.button}
            onClick={() => setOpenFeedModal(true)}>
            Написать отзыв
        </Button>
    )
}

export default ButtonModal