import React from "react";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { Space } from "antd";
import 'antd/dist/antd.css';

import { RootState } from "@redux/configure-store";
import loader from "./loader.json";
import classes from './index.module.css';

const Loader: React.FC = () => {
    const isLoading = useSelector(({ authStore }: RootState) => authStore.isLoading)

    return (
        isLoading ?
            <Space data-test-id='loader' direction="vertical" align="center" className={classes.loader_wrapper}>
                <Lottie data-test-id='loader' animationData={loader} loop={true} />
            </Space> : null
    )
}

export default Loader