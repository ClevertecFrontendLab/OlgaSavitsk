import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Progress,
    Stack,
    Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { AlertComponent } from '~/shared/components/alert/alert';
import { useAuthForm } from '~/shared/hooks/auth-form.hook';
import { signupSchema } from '~/shared/schemas/authSchemas';

import { RetryModal } from './components/retry-modal';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

const STEP_NAMES = {
    1: 'Шаг 1. Личная информация',
    2: 'Шаг 2. Логин и пароль',
} as const;

export type StepKey = keyof typeof STEP_NAMES;

export const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [progressValue, setProgressValue] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);

    const { alertState, showRetryModal, handleRegistration, closeRetryModal } = useAuthForm();

    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormData>({
        resolver: yupResolver(signupSchema),
    });

    const calculateProgress = useCallback(() => {
        const totalFields = 6;
        const touchedValidFields = Object.keys(touchedFields).filter(
            (field) => !errors[field as keyof FormData],
        ).length;

        const progress = (touchedValidFields / totalFields) * 100;
        return Math.round(progress);
    }, []);

    useEffect(() => {
        const newProgress = calculateProgress();
        setProgressValue(newProgress);
    }, [calculateProgress]);

    const onSubmit = async (data: FormData) => {
        handleRegistration(data);
    };

    const nextStep = () => {
        setCurrentStep(2);
    };

    // const CurrentStepComponent = STEP_COMPONENTS[currentStep];

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                data-test-id={DATA_TEST_ID.SIGNUP_PROGRESS}
            >
                <Text>{STEP_NAMES[currentStep as StepKey]}</Text>
                <Progress
                    size='sm'
                    hasStripe
                    value={progressValue}
                    sx={{
                        backgroundColor: 'blackAlpha.100',
                        '& > div': {
                            backgroundColor: 'lime.300',
                        },
                    }}
                    data-test-id={DATA_TEST_ID.SIGNUP_PROGRESS}
                />
                <Stack spacing={8} mx='auto' width={{ base: 328, md: 355, lg: 450, xl: 460 }}>
                    {currentStep === 1 ? (
                        <Stack spacing={28}>
                            <Stack spacing={6}>
                                <FormControl
                                    id='firstName'
                                    isInvalid={Boolean(errors.firstName?.message)}
                                >
                                    <FormLabel>Ваше имя</FormLabel>
                                    <Input
                                        type='text'
                                        bg='white'
                                        placeholder='Имя'
                                        size='lg'
                                        {...register('firstName')}
                                        data-test-id={DATA_TEST_ID.FIRST_NAME}
                                    />
                                    <FormErrorMessage>
                                        {errors.firstName?.message?.toString()}
                                    </FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    id='lastName'
                                    isInvalid={Boolean(errors.lastName?.message)}
                                >
                                    <FormLabel>Ваша фамилия</FormLabel>
                                    <Input
                                        type='text'
                                        bg='white'
                                        placeholder='Фамилия'
                                        size='lg'
                                        {...register('lastName')}
                                        data-test-id={DATA_TEST_ID.LAST_NAME}
                                    />
                                    <FormErrorMessage>
                                        {errors.lastName?.message?.toString()}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl id='email' isInvalid={Boolean(errors.email?.message)}>
                                    <FormLabel>Ваш e-mail</FormLabel>
                                    <Input
                                        type='text'
                                        bg='white'
                                        placeholder='e-mail'
                                        size='lg'
                                        {...register('email')}
                                        data-test-id={DATA_TEST_ID.EMAIL}
                                    />
                                    <FormErrorMessage>
                                        {errors.email?.message?.toString()}
                                    </FormErrorMessage>
                                </FormControl>
                            </Stack>
                            <Button
                                type='button'
                                loadingText='Submitting'
                                size='lg'
                                bg='blackAlpha.900'
                                color='white'
                                onClick={nextStep}
                                data-test-id={DATA_TEST_ID.SUBMIT}
                            >
                                Дальше
                            </Button>
                        </Stack>
                    ) : (
                        <Stack spacing={28}>
                            <Stack spacing={6}>
                                <FormControl id='login' isInvalid={Boolean(errors.login?.message)}>
                                    <FormLabel>Логин для входа на сайт</FormLabel>
                                    <Input
                                        type='login'
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
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }
                                            >
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.password?.message?.toString()}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    id='confirmPassword'
                                    isInvalid={Boolean(errors.confirmPassword)}
                                >
                                    <FormLabel>Повторите пароль</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            bg='white'
                                            placeholder='Повторите пароль'
                                            size='lg'
                                            {...register('confirmPassword')}
                                            data-test-id={DATA_TEST_ID.PASSWORD_CONFIRM}
                                        />
                                        <InputRightElement h='full'>
                                            <Button
                                                variant='ghost'
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>
                                        {errors.confirmPassword?.message?.toString()}
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
                                    Зарегистрироваться
                                </Button>
                            </Stack>
                        </Stack>
                    )}
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
