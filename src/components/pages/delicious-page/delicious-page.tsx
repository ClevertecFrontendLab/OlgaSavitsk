import { Box, Button, Divider, Flex, HStack } from '@chakra-ui/react';
import { Fragment } from 'react';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { HeaderPage } from '~/shared/components/header-page';

import { Recipie, recipies } from '../category-page/helpers';
import { additionalInfo } from '../main-page/helpers';

export const DeliciousPage = () => (
    <>
        <HeaderPage title='Самое сочное' />

        <HStack gap={4} flexWrap='wrap' justify='center'>
            <Flex
                flexDirection='row'
                flexWrap='wrap'
                columnGap={{ base: 4, md: 4, '2xl': 6 }}
                rowGap={4}
            >
                {recipies.map((recipe: Recipie, index: number) => (
                    <Fragment key={index}>
                        <DishCard {...recipe} />
                    </Fragment>
                ))}
            </Flex>
            <Button size={{ base: 'md', lg: 'md' }} bg='lime.400'>
                Загрузить ещё
            </Button>
        </HStack>

        <Box pt={{ base: 8, md: 8, lg: 10 }}>
            <Divider pb={{ md: 2 }} />
            <AdditionalBlock
                title='Веганская кухня'
                description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                recipes={additionalInfo}
            />
        </Box>
    </>
);
