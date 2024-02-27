import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Result, Grid, Typography } from "antd";
import VerificationInput from 'react-verification-input';
import 'antd/dist/antd.css';

import {
    authActions,
    selectAuthEmail,
    selectAuthStatusCode
} from '@redux/auth';
import classes from './index.module.css';

const { Text } = Typography;
const { useBreakpoint } = Grid;

export const ConfirmEmailPage: React.FC = () => {
    const dispatch = useDispatch()
    const statusCode = selectAuthStatusCode()
    const email = selectAuthEmail()
    const [value, setValue] = useState<string>('')
    const { xs } = useBreakpoint();


    const onConfirmHandle = useCallback(async (value: string) => {
        if (email) {
            dispatch(
                authActions.confirmEmailRequest(
                    { email: email, code: value, }))
            setValue('')
        }
    }, [dispatch, email])

    const onChange = useCallback((value: string) => {
        setValue(value)
    }, [])

    return (
        <Result className={classes.result_layout}
            status={!statusCode ? 'info' : 'error'}
            title={!statusCode ?
                `Введите код
                 для восстановления аккауанта` :
                'Неверный код. Введите код для восстановления аккауанта'}
            subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`}
            extra={[
                <VerificationInput
                    inputProps={{ ['data-test-id']: 'verification-input' }}
                    key='confirm-input' placeholder='' length={6}
                    onComplete={onConfirmHandle}
                    onChange={onChange}
                    value={value}
                    classNames={{
                        container: classes.container,
                        character: statusCode ? classes.failed : classes.character,
                        characterSelected: classes.selected,
                    }} />,
                <Text
                    key='confirm-text'
                    type="secondary"
                    style={{ width: xs ? 230 : '96%' }}>
                    Не пришло письмо? Проверьте папку Спам.
                </Text>
            ]} />

    );
};