import { Box, IconButton, Show, Spacer, Text, VStack } from '@chakra-ui/react';

import EditIcon from '~/assets/icons/edit.svg';
import { GRADIENT_STYLES } from '~/constants/menu.constants';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

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
        <Show above='xl'>
            <StatisticsComponent direction='column' />
        </Show>
        <Spacer />
        <VStack h={180} w={208} justifyContent='center' {...GRADIENT_STYLES}>
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
