import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import exitIcon from '~/assets/icons/exit.svg';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

import { Menu } from './menu';

export const SideBar = () => (
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
            <Menu />

            <VStack px={6} w='full' gap={4} align='start'>
                <Text fontSize='xs' color='blackAlpha.400'>
                    Версия программы 03.25
                </Text>
                <Text fontSize='xs' color='blackAlpha.700'>
                    Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                <Button leftIcon={<CustomIcon icon={exitIcon} />} variant='ghost' size='sm' p={0}>
                    Выйти
                </Button>
            </VStack>
        </Flex>
    </Box>
);
