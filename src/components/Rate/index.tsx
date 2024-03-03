import { Rate } from "antd"
import classes from './index.module.css';
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useCallback } from "react";

type RateProps = {
    disabled: boolean;
    defaultValue?: number,
    size?: number
    setRating?: (rate: number) => void
}

const RateComponent: React.FC<RateProps> = ({ disabled, defaultValue = 0, setRating, size = 16 }: RateProps) => {

    const handleRating = useCallback((value: number) => {
        if (setRating) setRating(value)
    }, [setRating])

    return (
        <Rate
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={handleRating}
            character={({ index, value }) => {
                return index! < value!
                    ? <StarFilled style={{ color: 'var(--ant-rate-color)', fontSize: size }} />
                    : <StarOutlined  style={{ color: 'var(--ant-rate-color)', fontSize: size }} />
            }

            }
            style={{}}
            className={classes.rate}
        />
    )
}

export default RateComponent