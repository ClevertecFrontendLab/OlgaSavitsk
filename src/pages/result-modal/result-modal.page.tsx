import React, { useMemo } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Result } from "antd";
import 'antd/dist/antd.css';

import { RootState, history } from "@redux/configure-store";
import { resultContext } from "./result.helper";
import classes from './index.module.css';

export const ResultModal: React.FC = () => {
    const locationPathname = useSelector(({ router }: RootState) => router.location?.pathname)

    const context = useMemo(() => {
        if (locationPathname) {
            return resultContext.get(locationPathname);
        }
    }, [locationPathname]);

    return (
        context && <Result
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

export function ErrorBoundary() {
    const error = useRouteError();
    console.log('err', error)
    if (isRouteErrorResponse(error) && error.status === 401) {

        return (
            <ResultModal />
        );
    }


    throw error;
}