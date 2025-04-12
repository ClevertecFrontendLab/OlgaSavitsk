import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    HStack,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { Fragment } from 'react';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { Filter } from '~/components/filter/filter';

import { additionalInfo } from '../main-page/helpers';
import { Recipie, recipies } from '../vegan-page/helpers';

export const DeliciousPage = () => {
    const headingSize = useBreakpointValue({ base: 'md', md: 'lg', lg: '2xl' });

    return (
        <>
            <Center>
                <VStack w='full'>
                    <Heading as='h1' size={headingSize} textAlign='center' fontWeight={700}>
                        Самое сочное
                    </Heading>
                    <Filter />
                </VStack>
            </Center>

            <HStack pt={8} gap={4} flexWrap='wrap' justify='center'>
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
                    descriptions='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                    recipiesInfo={additionalInfo}
                />
            </Box>
        </>
    );
};
