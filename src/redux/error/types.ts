export enum ErrorTypes {
    SET_ERROR = 'SET_ERROR',
}

export type ErrorState = {
    statusCode?: ErrorPayloadType;
};

export type ErrorPayloadType = number | 'success' | 'error' | '500' | undefined;

export type ErrorAction<Payload> = {
    type: ErrorTypes;
    payload: Payload;
};
