import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Button, Result, Space } from "antd";
import 'antd/dist/antd.css';

import { RootState, history } from "@redux/configure-store";
import { resultContext } from "./result.helper";
import classes from './index.module.css';

export const ResultModal: React.FC = () => {
    const location = useSelector(({ router }: RootState) => router.location?.pathname)

    const context = useMemo(() => {
        if (location) {
            return resultContext.get(location);
        }
    }, [location]);

    return (
            context && <Result
                className={classes.result_layout}
                status={context.status}
                title={context.title}
                subTitle={context.subTitle}
                extra={[
                    <Button
                        type="primary"
                        size="large"
                        key="console"
                        style={{ width: '100%' }}
                        onClick={() => history.push(context.redirectPath, location)}>
                        {context.buttonText}
                    </Button>
                ]}
            />
    );
};