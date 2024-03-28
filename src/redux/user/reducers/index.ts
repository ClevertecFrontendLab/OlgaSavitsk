import { UploadResponse, UserAction, UserResponse, UserState, UserTypes } from '..';

const initialState: UserState = {
    user: null,
    progress: 0,
    statusCode: undefined,
};

export const userReducer = <T>(state = initialState, { type, payload }: UserAction<T>) => {
    switch (type) {
        case UserTypes.GET_USER: {
            return state;
        }
        case UserTypes.SET_USER: {
            return {
                ...state,
                user: payload as UserResponse,
            };
        }
        case UserTypes.UPDATE_USER_REQUEST: {
            return { ...state, statusCode: null };
        }
        case UserTypes.UPDATE_USER_SUCCESS: {
            return { ...state, user: payload };
        }

        case UserTypes.UPLOAD_FILE_REQUEST: {
            return { ...state, statusCode: null };
        }
        case UserTypes.UPLOAD_FILE_SUCCESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    imgSrc: `https://training-api.clevertec.ru${(payload as UploadResponse).url}`,
                },
            };
        }
        case UserTypes.UPLOAD_PROGRESS: {
            return {
                ...state,
                progress: payload,
            };
        }
        default:
            return state;
    }
};
