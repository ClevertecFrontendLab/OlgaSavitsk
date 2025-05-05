import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { userErrorSelector } from '~/store/app-slice';

export const AlertComponent = () => {
    const isError = useSelector(userErrorSelector);
    const { onClose } = useDisclosure({ defaultIsOpen: true });

    if (!isError) return null;

    return (
        <Box
            position='fixed'
            bottom={0}
            left='50%'
            transform='translate(-50%, -50%)'
            zIndex='toast'
        >
            <Alert variant='errorToast'>
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
                />
            </Alert>
        </Box>
    );
};
