import 'antd/dist/antd.css';

import { selectLocationPath } from "@redux/auth";
import { history } from "@redux/configure-store";
import { Button, Result } from "antd";
import React, { useMemo } from "react";

import classes from './index.module.css';
import { resultContext } from "./result.helper";

export const ResultModal: React.FC = () => {
    const locationPathname = selectLocationPath()

    const context = useMemo(() => {
        if (locationPathname) {
            return resultContext.get(locationPathname);
        }
    }, [locationPathname]);

    return (
        context &&
        <Result
            className={classes.result_layout}
            status={context.status}
            title={context.title}
            subTitle={context.subTitle}
            extra={[
                <Button
                    data-test-id={context.dataId}
                    type="primary"
                    size="large"
                    key="console"
                    style={{ width: '100%' }}
                    onClick={() =>
                        history.push(context.redirectPath)}
                >
                    {context.buttonText}
                </Button>
            ]}
        />
    );
};

