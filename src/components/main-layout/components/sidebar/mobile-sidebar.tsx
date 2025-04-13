import { ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Collapse,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';

import exitIcon from '~/assets/icons/exit.svg';
import { menuItems } from '~/constants/menu.constants';
import { RoutePath } from '~/constants/routes.constants';

import { CustomIcon } from '../../../custom-icon/custom-icon';
import { NavItem } from '../../../nav-item/nav-item';

export const MobileSideBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <IconButton
                display={{ base: 'block', lg: 'none' }}
                variant='ghost'
                onClick={onOpen}
                aria-label='open menu'
                icon={<HamburgerIcon boxSize={6} />}
                size='lg'
            />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                isFullHeight
            >
                <DrawerOverlay />
                <DrawerContent>
                    <Flex direction='column'>
                        <VStack spacing='1' align='stretch'>
                            <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink>Главная</BreadcrumbLink>
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <VStack align='stretch' flex={1}>
                                {menuItems.map(({ route: path, subItems, id, ...item }) => (
                                    <Box key={id}>
                                        <NavItem
                                            href={`${RoutePath.veganPage}/0`}
                                            rightIcon
                                            {...item}
                                        />
                                        <Collapse animateOpacity>
                                            <VStack pl='8' align='stretch' spacing='1'>
                                                {subItems?.map(({ title, route }) => (
                                                    <NavItem
                                                        key={route}
                                                        href={`${path}/${route}`}
                                                        label={title}
                                                    />
                                                ))}
                                            </VStack>
                                        </Collapse>
                                    </Box>
                                ))}
                            </VStack>
                        </VStack>
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
                </DrawerContent>
            </Drawer>
        </>
    );
};
