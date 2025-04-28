import { Box, Button, Flex, Text, useBreakpointValue, VStack } from '@chakra-ui/react';

import exitIcon from '~/assets/icons/exit.svg';
import { menuItems } from '~/constants/menu.constants';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

import { Menu } from './menu';

export const SideBar = () => {
    const isTablet = useBreakpointValue({
        base: false,
        md: false,
        lg: true,
    });

    return (
        <Box
            as='nav'
            display={{ base: 'none', xl: 'block' }}
            left={0}
            position='fixed'
            h='calc(100vh - 80px)'
            maxW={256}
            borderRightWidth={1}
            zIndex='sticky'
            py={9}
        >
            <Flex direction='column' h='full'>
                {isTablet && <Menu menuItems={menuItems} />}

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
