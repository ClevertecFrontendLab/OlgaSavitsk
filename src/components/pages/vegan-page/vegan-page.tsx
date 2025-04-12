import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Heading,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { Filter } from '~/components/filter/filter';
import { Category, subMenus } from '~/constants/menu.constants';

import { additionalInfo, Recipie, recipies } from './helpers';
import classes from './index.module.css';

export const VeganPage = () => {
    const headingSize = useBreakpointValue({ base: 'lg', md: 'lg', lg: '2xl' });
    const { id } = useParams();

    return (
        <>
            <Center>
                <VStack>
                    <Heading as='h1' size={headingSize} textAlign='center' fontWeight={700}>
                        Веганская кухня
                    </Heading>
                    <Text color='blackAlpha.600' maxW={700} textAlign='center' fontWeight={500}>
                        Интересны не только убеждённым вегетарианцам, но и тем, кто хочет
                        попробовать вегетарианскую диету и готовить вкусные вегетарианские блюда.
                    </Text>
                    <Filter />
                </VStack>
            </Center>

            <Tabs index={+id! || 0} colorScheme='lime' display='flex' flexDirection='column' pt={8}>
                <TabList
                    overflowX={{ base: 'auto', md: 'auto', lg: 'auto', '2xl': 'unset' }}
                    maxW={{ base: 360, md: 768, lg: '4xl' }}
                    className={classes.tabList}
                >
                    {subMenus[Category.Vegan]!.map(({ title, route }, index) => (
                        <Tab
                            key={index}
                            as={Link}
                            to={`/vegan/${route}`}
                            whiteSpace='nowrap'
                            fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                        >
                            {title}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {subMenus[Category.Vegan]!.map((_, index) => (
                        <TabPanel p={0} key={index}>
                            <HStack pt={6} flexWrap='wrap' justify='center'>
                                <Flex
                                    flexDirection='row'
                                    flexWrap='wrap'
                                    columnGap={{ base: 4, md: 4, '2xl': 6 }}
                                    rowGap={4}
                                    pb={4}
                                >
                                    {recipies.map((recipe: Recipie, index: number) => (
                                        <Fragment key={index}>
                                            <DishCard {...recipe} />
                                        </Fragment>
                                    ))}
                                </Flex>
                                <Button size={{ base: 'md', md: 'md', lg: 'lg' }} bg='lime.400'>
                                    Загрузить ещё
                                </Button>
                            </HStack>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <Box pt={{ base: 8, md: 8, lg: 10 }}>
                <Divider pb={{ md: 2 }} />
                <AdditionalBlock
                    title='Десерты, выпечка'
                    descriptions='Без них невозможно представить себе ни современную, ни традиционную  кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб - рецепты изделий из теста многообразны и невероятно популярны.'
                    recipiesInfo={additionalInfo}
                />
            </Box>
        </>
    );
};
