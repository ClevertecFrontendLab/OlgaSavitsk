import { Avatar, Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';

import EditIcon from '~/assets/icons/edit-icon.svg';
import homeIcon from '~/assets/icons/home.svg';
import SearchIcon from '~/assets/icons/search.svg';
import avatar from '~/assets/images/avatar.png';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

import classes from './index.module.css';

export const FooterComponent = () => (
    <Box
        position='fixed'
        bottom={0}
        display={{ base: 'flex', md: 'flex', xl: 'none' }}
        data-test-id={DATA_TEST_ID.footer}
        w='full'
        h={84}
    >
        <HStack className={classes.footer} bg='lime.50'>
            <VStack h='full' justify='space-between' w={90}>
                <IconButton
                    isRound={true}
                    bg='black'
                    aria-label='Home'
                    icon={<CustomIcon icon={homeIcon} />}
                    size='md'
                    boxShadow='0 0 10px 15px rgba(196, 255, 97, 0.25)'
                />
                <Text fontSize='xs' color='black' fontWeight={500} zIndex={10}>
                    Главная
                </Text>
            </VStack>

            <VStack justify='space-between' w={90}>
                <IconButton
                    aria-label='Search'
                    icon={<CustomIcon icon={SearchIcon} boxSize={6} />}
                    variant='ghost'
                    size='md'
                />
                <Text fontSize='xs' color='blackAlpha.700'>
                    Поиск
                </Text>
            </VStack>
            <VStack justify='space-between' w={90}>
                <IconButton
                    aria-label='Edit'
                    icon={<CustomIcon icon={EditIcon} boxSize={6} />}
                    size='md'
                    variant='ghost'
                />
                <Text fontSize='xs' color='blackAlpha.700'>
                    Записать
                </Text>
            </VStack>
            <VStack justify='space-between' h='full' w={90}>
                <IconButton
                    isRound={true}
                    bg='black'
                    aria-label='Profile'
                    icon={<Avatar h={10} w={10} src={avatar} />}
                    size='md'
                />
                <Text fontSize='xs' color='blackAlpha.700' whiteSpace='nowrap'>
                    Мой профиль
                </Text>
            </VStack>
        </HStack>
    </Box>
);
