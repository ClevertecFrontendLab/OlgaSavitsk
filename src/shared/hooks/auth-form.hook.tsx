import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { HttpStatusCode } from '~/constants/status-code.constants';
import { useLoginMutation, useSignupMutation } from '~/query/services/auth';
import { LoginRequest, SignUpRequest } from '~/query/types/auth';

type ApiErrorResponse = {
    status: number;
    data?: {
        message?: string;
    };
};

type AlertState = {
    show: boolean;
    title: string;
    message: string | undefined;
};

export const useAuthForm = () => {
    // const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showRetryModal, setShowRetryModal] = useState(false);
    const [alertState, setAlertState] = useState<AlertState>({
        show: false,
        title: '',
        message: '',
    });
    const navigate = useNavigate();

    const [login] = useLoginMutation();
    const [signup] = useSignupMutation();

    const showAlert = useCallback((title: string, message?: string | undefined) => {
        setAlertState({
            show: true,
            title,
            message,
        });
    }, []);

    const handleRegistration = useCallback(
        async (credentials: SignUpRequest) => {
            try {
                const response = await signup(credentials).unwrap();

                if (response.status === HttpStatusCode.OK) {
                    // setShowVerificationModal(true);
                }
            } catch (error: unknown) {
                const apiError = error as ApiErrorResponse;

                switch (apiError.status) {
                    case HttpStatusCode.BAD_REQUEST:
                        if (apiError.data?.message?.includes('Email')) {
                            showAlert('Пользователь с таким email уже существует');
                        } else if (apiError.data?.message?.includes('Логин')) {
                            showAlert('Пользователь с таким login уже существует');
                        }
                        break;

                    default:
                        setShowRetryModal(true);
                        break;
                }
            }
        },
        [signup, showAlert],
    );

    const handleLogin = async (credentials: LoginRequest) => {
        try {
            await login(credentials).unwrap();
            navigate(RoutePath.mainPage);
        } catch (error: unknown) {
            const apiError = error as ApiErrorResponse;

            switch (apiError.status) {
                case HttpStatusCode.UNAUTHORIZED:
                    showAlert('Неверный логин или пароль', 'Попробуйте снова');
                    break;

                case HttpStatusCode.FORBIDDEN:
                    showAlert('E-mail не верифицирован', 'Проверьте почту и перейдите по ссылке');
                    break;

                default:
                    setShowRetryModal(true);
                    break;
            }
        }
    };

    const closeRetryModal = () => {
        setShowRetryModal(false);
    };

    return {
        alertState,
        showRetryModal,
        handleLogin,
        closeRetryModal,
        handleRegistration,
    };
};
