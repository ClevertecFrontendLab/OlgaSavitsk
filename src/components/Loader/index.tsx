import 'antd/dist/antd.css';

import { selectAuthLoading } from "@redux/auth/selectors";
import { selectLoading } from "@redux/loader/selectors";
import { Space, Spin } from "antd";
import Lottie from "lottie-react";

import classes from './index.module.css';
import loader from "./loader.json";

const Loader: React.FC = () => {
    const isLoading = selectAuthLoading() || selectLoading()

    return (
        isLoading ?
            <Space direction="vertical" align="center" >
                <Spin indicator={<Lottie data-test-id='loader' animationData={loader} loop={true} />} className={classes.loader_wrapper} />
            </Space>
            : null
    )
}

export default Loader