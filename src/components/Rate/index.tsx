import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Rate } from "antd"
import { useCallback } from "react";

import classes from './index.module.css';

type RateProps = {
    disabled: boolean;
    defaultValue?: number,
    size?: number
    setRating?: (rate: number) => void
}

const RateComponent: React.FC<RateProps> = ({ disabled, defaultValue = 0, setRating, size = 13 }: RateProps) => {

    const handleRating = useCallback((value: number) => {
        if (setRating) setRating(value)
    }, [setRating])

    return (
        <Rate
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={handleRating}
            character={({ index, value }) => {
                return value && index! < value
                    ? <StarFilled style={{ color: 'var(--ant-rate-color)', fontSize: size, lineHeight: size, verticalAlign: 'top' }} />
                    : <StarOutlined style={{ color: 'var(--ant-rate-color)', fontSize: size, lineHeight: size, verticalAlign: 'top' }} />
            }
            }
            className={classes.rate}
        />
    )
}

export default RateComponent