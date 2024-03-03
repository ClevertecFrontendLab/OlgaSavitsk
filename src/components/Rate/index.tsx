import { Rate } from "antd"
import classes from './index.module.css';
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useCallback } from "react";

type RateProps = {
    disabled: boolean;
    defaultValue?: number,
    setRating?: (rate: number) => void
}

const RateComponent: React.FC<RateProps> = ({ disabled, defaultValue, setRating }: RateProps) => {

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
                    ? <StarFilled style={{ color: 'var(--ant-rate-color)' }} />
                    : <StarOutlined style={{ color: 'var(--ant-rate-color)' }} />
            }

            }
            className={classes.rate}
        />
    )
}

export default RateComponent