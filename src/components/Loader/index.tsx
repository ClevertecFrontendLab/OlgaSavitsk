import Lottie from "lottie-react";
import { Space, Spin } from "antd";
import 'antd/dist/antd.css';

import { selectAuthLoading } from "@redux/auth/selectors";
import loader from "./loader.json";
import classes from './index.module.css';

const Loader: React.FC = () => {
    const isLoading = selectAuthLoading()

    return (
        isLoading ?
            <Space direction="vertical" align="center" >
                <Spin indicator={<Lottie data-test-id='loader' animationData={loader} loop={true}/>} className={classes.loader_wrapper}/>
            </Space>
            : null
    )
}

export default Loader