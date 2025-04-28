import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    IconButton,
    Text,
    useBreakpointValue,
    useColorModeValue,
    useOutsideClick,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';

import exitIcon from '~/assets/icons/exit.svg';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { menuItems } from '~/constants/menu.constants';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

import { Breadcrumbs } from '../header/breadcrumb';
import { Menu } from './menu';

type MobileSideBarProps = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
};

export const MobileSideBar: FC<MobileSideBarProps> = ({ isOpen, onClose, onOpen }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const bgColor = useColorModeValue('white', 'gray.800');
    const isTablet = useBreakpointValue({
        base: false,
        md: false,
        lg: true,
    });

    const handleToggle = () => {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    };

    useOutsideClick({
        ref: menuRef as React.RefObject<HTMLElement>,
        handler: (e) => {
            const target = e.target as HTMLElement;
            if (!buttonRef.current?.contains(target)) {
                onClose();
            }
        },
    });

    return (
        <>
            <Box display={{ base: 'block', lg: 'none' }}>
                <IconButton
                    ref={buttonRef}
                    display={{ base: 'block', lg: 'none' }}
                    variant='ghost'
                    onClick={handleToggle}
                    aria-label='open menu'
                    icon={
                        isOpen ? (
                            <CloseIcon boxSize={3} data-test-id={DATA_TEST_ID.CLOSE_ICON} />
                        ) : (
                            <HamburgerIcon boxSize={6} data-test-id={DATA_TEST_ID.HUMB_ICON} />
                        )
                    }
                    size='lg'
                />
            </Box>
            {isOpen && (
                <Box
                    position='fixed'
                    top='64px'
                    left={0}
                    w='100%'
                    h='100vh'
                    bg='blackAlpha.300'
                    backdropFilter='blur(2px)'
                />
            )}
            <Flex
                ref={menuRef}
                direction='column'
                position='fixed'
                top={16}
                right='0'
                w={344}
                height={{ base: 652, sm: 652, md: 868, lg: '100vh' }}
                bg={bgColor}
                zIndex='modal'
                display={isOpen ? 'flex' : 'none'}
                borderBottomRadius='lg'
                mx={2}
                data-test-id={isTablet || isOpen ? 'nav' : ''}
            >
                <Box p={4}>
                    <Breadcrumbs />
                </Box>

                {isOpen && <Menu menuItems={menuItems} />}

                <Box px={6} w='full'>
                    <Text fontSize='xs' color='blackAlpha.400'>
                        Версия программы 03.25
                    </Text>
                    <Text fontSize='xs' color='blackAlpha.700'>
                        Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                    </Text>
                    <Button leftIcon={<CustomIcon icon={exitIcon} />} variant='ghost' p={0}>
                        Выйти
                    </Button>
                </Box>
            </Flex>
        </>
    );
};
