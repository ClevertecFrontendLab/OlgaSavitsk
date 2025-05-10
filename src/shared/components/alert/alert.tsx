import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { userErrorSelector } from '~/store/app-slice';

export const AlertComponent = () => {
    const isError = useSelector(userErrorSelector);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (isError) {
            onOpen();
        }
    }, [isError, onOpen]);

    if (!isOpen) return null;

    return (
        <Box
            position='fixed'
            bottom={0}
            left='50%'
            transform='translate(-50%, -50%)'
            zIndex='toast'
        >
            <Alert variant='errorToast' data-test-id={DATA_TEST_ID.ERROR_NOTIFICATION}>
                <AlertIcon />
                <Box flex='1'>
                    <AlertTitle>Ошибка сервера</AlertTitle>
                    <AlertDescription>Попробуйте поискать снова попозже</AlertDescription>
                </Box>
                <CloseButton
                    alignSelf='flex-start'
                    position='relative'
                    right={-1}
                    top={-1}
                    onClick={onClose}
                    data-test-id={DATA_TEST_ID.CLOSE_ALERT}
                />
            </Alert>
        </Box>
    );
};
