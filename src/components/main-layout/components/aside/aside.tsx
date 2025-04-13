import { Box, IconButton, Show, Spacer, Text, VStack } from '@chakra-ui/react';

import EditIcon from '~/assets/icons/edit.svg';
import { CustomIcon } from '~/components/custom-icon/custom-icon';

import { StatisticsComponent } from './statistics';

export const Aside = () => (
    <Box
        display={{ base: 'none', lg: 'flex' }}
        flexDirection='column'
        alignItems='center'
        h='calc(100vh - 80px)'
        right={0}
        position='fixed'
        pt={6}
    >
        <Show above='md'>
            <StatisticsComponent direction='column' />
        </Show>
        <Spacer />
        <VStack
            h={180}
            w={208}
            justifyContent='center'
            bg='radial-gradient(circle at 50% 50%, rgba(196, 255, 97, 0.72) 0%, rgba(255, 255, 255, 0) 50%)'
        >
            <IconButton
                isRound={true}
                bg='black'
                aria-label='Edit'
                icon={<CustomIcon icon={EditIcon} boxSize={6} />}
                size='lg'
            />
            <Text fontSize='xs' color='blackAlpha.700'>
                Записать рецепт
            </Text>
        </VStack>
    </Box>
);
