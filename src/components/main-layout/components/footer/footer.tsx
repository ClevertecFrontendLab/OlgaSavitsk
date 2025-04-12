import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box, HStack, IconButton, Show, Text, VStack } from '@chakra-ui/react';

import homeIcon from '~/assets/icons/home.svg';
import avatar from '~/assets/images/avatar.png';
import { DATA_TEST_ID } from '~/constants/data-test-id';

import { CustomIcon } from '../../../custom-icon/custom-icon';
import classes from './index.module.css';

export const FooterComponent = () => (
    <Show below='md'>
        <Box
            position='fixed'
            bottom={0}
            display={{ base: 'flex', md: 'flex', '2xl': 'none' }}
            pt={6}
            data-test-id={DATA_TEST_ID.footer}
            w='full'
        >
            <HStack className={classes.footer} bg='lime.50'>
                <VStack
                    w={90}
                    justifyContent='center'
                    bg='radial-gradient(circle at 50% 50%, rgba(196, 255, 97, 0.72) 0%, rgba(255, 255, 255, 0) 50%)'
                >
                    <IconButton
                        isRound={true}
                        bg='black'
                        aria-label='Search'
                        icon={<CustomIcon icon={homeIcon} />}
                        size='md'
                    />
                    <Text fontSize='xs' color='blackAlpha.700'>
                        Главная
                    </Text>
                </VStack>

                <VStack>
                    <IconButton
                        aria-label='Search'
                        icon={<SearchIcon boxSize={6} />}
                        variant='ghost'
                    />
                    <Text fontSize='xs' color='blackAlpha.700'>
                        Поиск
                    </Text>
                </VStack>
                <VStack>
                    <IconButton
                        aria-label='Search'
                        icon={<EditIcon boxSize={6} />}
                        size='lg'
                        variant='ghost'
                    />
                    <Text fontSize='xs' color='blackAlpha.700'>
                        Записать
                    </Text>
                </VStack>
                <VStack>
                    <Avatar size='m' src={avatar} />
                    <Text fontSize='xs' color='blackAlpha.700'>
                        Мой профиль
                    </Text>
                </VStack>
            </HStack>
        </Box>
    </Show>
);
