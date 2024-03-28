import { UploadFile } from 'antd';
import { Dayjs } from 'dayjs';

export enum UserTypes {
    GET_USER = 'GET_USER',
    SET_USER = 'SET_USER',
    UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
    UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST',
    UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS',
    UPLOAD_PROGRESS = 'UPLOAD_PROGRESS',
}

export type UserState = {
    user: UserResponse | null;
    progress: number;
    statusCode: number | undefined;
};

export type UserAction<Payload> = {
    type: UserTypes;
    payload: Payload;
};

export type UserReducer = (state: UserState, actions: UserAction<UserState>) => UserState;

export type UserResponse = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: Dayjs;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: Tariff;
};

export type Tariff = {
    tariffId: string;
    expired: Date;
};

export type UserPayload = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: Dayjs;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
};

export type UploadPayload = {
    data: UploadFile,
}

export type UploadResponse = {
    name: string;
    url: string
}
