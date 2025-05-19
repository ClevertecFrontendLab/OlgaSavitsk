import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';

import successIcon from '~/assets/icons/success-modal.svg';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

type RetryModalProps = {
    isOpen: boolean;
    onRetry: () => void;
    onClose: () => void;
};

export const RetryModal: FC<RetryModalProps> = ({ isOpen, onRetry, onClose }) => (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent data-test-id={DATA_TEST_ID.SIGNIN_ERROR_MODAL}>
            <IconButton
                icon={<CloseIcon />}
                onClick={onClose}
                data-test-id={DATA_TEST_ID.CLOSE_BUTTON}
                aria-label=''
            />
            <CustomIcon icon={successIcon} boxSize={{ base: 108, xl: 206 }} />
            <ModalCloseButton />
            <ModalBody>
                <Text>Вход не выполнен</Text>
                <Text>
                    Что-то пошло не так. <br />
                    Попробуйте еще раз
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onRetry} data-test-id={DATA_TEST_ID.REPEAT}>
                    Повторить
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
);
