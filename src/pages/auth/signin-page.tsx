import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { LoginRequest } from '~/query/types/auth';
import { AlertComponent } from '~/shared/components/alert/alert';
import { useAuthForm } from '~/shared/hooks/auth-form.hook';
import { loginSchema } from '~/shared/schemas/authSchemas';

import { RetryModal } from './components/retry-modal';

export const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { alertState, showRetryModal, handleLogin, closeRetryModal } = useAuthForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = (data: LoginRequest) => handleLogin(data);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate data-test-id={DATA_TEST_ID.SIGNIN}>
                <Stack spacing={8} mx='auto' width={{ base: 328, md: 355, lg: 450, xl: 460 }}>
                    <Stack spacing={28}>
                        <Stack spacing={6}>
                            <FormControl id='login' isInvalid={Boolean(errors.login?.message)}>
                                <FormLabel>Логин для входа на сайт</FormLabel>
                                <Input
                                    type='email'
                                    bg='white'
                                    placeholder='Введите логин'
                                    size='lg'
                                    {...register('login')}
                                    data-test-id={DATA_TEST_ID.LOGIN_INPUT}
                                />
                                <FormErrorMessage>
                                    {errors.login?.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl
                                id='password'
                                isInvalid={Boolean(errors.password?.message)}
                            >
                                <FormLabel>Пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        bg='white'
                                        placeholder='Пароль для сайта'
                                        size='lg'
                                        {...register('password')}
                                        data-test-id={DATA_TEST_ID.PASSWORD}
                                    />
                                    <InputRightElement h='full'>
                                        <Button
                                            variant='ghost'
                                            onMouseDown={() => setShowPassword(true)}
                                            onMouseUp={() => setShowPassword(false)}
                                            onMouseLeave={() => setShowPassword(false)}
                                            data-test-id={DATA_TEST_ID.PASSWORD_VISIBILITY}
                                        >
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.password?.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>

                        <Stack spacing={4}>
                            <Button
                                type='submit'
                                loadingText='Submitting'
                                size='lg'
                                bg='blackAlpha.900'
                                color='white'
                                data-test-id={DATA_TEST_ID.SUBMIT}
                            >
                                Войти
                            </Button>
                            <Text align='center'>
                                <Link
                                    to={RoutePath.forgotPassword}
                                    color='blue.400'
                                    data-test-id={DATA_TEST_ID.FORGOT_PASSWORD}
                                >
                                    Забыли логин или пароль?
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </form>
            {alertState.show && (
                <AlertComponent title={alertState.title} message={alertState.message} />
            )}
            <RetryModal
                isOpen={showRetryModal}
                onRetry={handleSubmit(onSubmit)}
                onClose={closeRetryModal}
            />
        </>
    );
};
