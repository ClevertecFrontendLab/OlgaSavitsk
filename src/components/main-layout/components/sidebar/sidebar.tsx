import { Box, Button, Collapse, Flex, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import exitIcon from '~/assets/icons/exit.svg';
import { Category, categoryMap, menuItems } from '~/constants/menu.constants';
import { RoutePath } from '~/constants/routes.constants';
import { getSubMenuLabel } from '~/utils/get-label';

import { CustomIcon } from '../../../custom-icon/custom-icon';
import { NavItem } from '../../../nav-item/nav-item';
import classes from './index.module.css';

export const SideBar = () => {
    const location = useLocation();
    const [openState, setOpenState] = useState<Record<string, boolean>>({});
    const [active, setActive] = useState<string | undefined>(undefined);

    const pathSnippets = location.pathname.split('/').filter(Boolean);

    useEffect(() => {
        pathSnippets.map((snippet) => {
            const category = Object.values(Category).find(
                (cat) => categoryMap[cat].route === `/${pathSnippets[0]}`,
            );
            const subMenu = getSubMenuLabel(category, snippet);
            setActive(subMenu);
        });
    }, [pathSnippets]);

    const handleMenuItem = (id: string) => {
        setOpenState((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Box
            as='nav'
            display={{ base: 'none', lg: 'block' }}
            left={0}
            position='fixed'
            h='calc(100vh - 80px)'
            maxW={256}
            borderRightWidth={1}
            zIndex='sticky'
            py={9}
        >
            <Flex direction='column' h='full'>
                <VStack align='stretch' flex={1} className={classes.active}>
                    {menuItems.map(({ route: path, subItems, dataTestId, id, ...item }) => (
                        <Box key={id} data-test-id={dataTestId}>
                            <NavItem
                                href={`${RoutePath.veganPage}/0`}
                                isOpen={openState[id]}
                                dataTestId={dataTestId}
                                rightIcon
                                onClick={() => handleMenuItem(id)}
                                {...item}
                            />
                            <Collapse in={openState[id]} animateOpacity>
                                <VStack pl='8' align='stretch' spacing='2' pt={2}>
                                    {subItems?.map(({ title, route }) => (
                                        <NavItem
                                            key={route}
                                            href={`${path}/${route}`}
                                            label={title}
                                            active={title === active}
                                            isSubmenu
                                            onClick={() => setActive(title)}
                                        />
                                    ))}
                                </VStack>
                            </Collapse>
                        </Box>
                    ))}
                </VStack>
                <VStack px={6} w='full' gap={4} align='start'>
                    <Text fontSize='xs' color='blackAlpha.400'>
                        Версия программы 03.25
                    </Text>
                    <Text fontSize='xs' color='blackAlpha.700'>
                        Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                    </Text>
                    <Button
                        leftIcon={<CustomIcon icon={exitIcon} />}
                        variant='ghost'
                        size='sm'
                        p={0}
                    >
                        Выйти
                    </Button>
                </VStack>
            </Flex>
        </Box>
    );
};
