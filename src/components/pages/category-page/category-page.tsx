import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { FC, Fragment } from 'react';
import { Link, useParams } from 'react-router';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { HeaderPage } from '~/shared/components/header-page';
import { PageConfig } from '~/shared/types/page-config.types';

import { Recipie } from './helpers';
import classes from './index.module.css';

export const CategoryPage: FC<PageConfig> = ({
    path,
    title,
    subTitle,
    subMenus,
    recipes,
    additionalInfo,
}) => {
    const { id } = useParams();

    return (
        <>
            <HeaderPage title={title} subTitle={subTitle} />

            <Tabs index={+id! || 0} colorScheme='lime' display='flex' flexDirection='column'>
                <TabList
                    overflowX={{ base: 'auto', md: 'auto', lg: 'auto', '2xl': 'unset' }}
                    maxW={{ base: 360, md: 768, lg: '4xl' }}
                    className={classes.tabList}
                >
                    {subMenus!.map(({ title, route }, index) => (
                        <Tab
                            key={index}
                            as={Link}
                            to={`/${path}/${route}`}
                            whiteSpace='nowrap'
                            fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                            sx={{ marginBottom: 0 }}
                        >
                            {title}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {subMenus!.map((_, index) => (
                        <TabPanel p={0} key={index}>
                            <HStack pt={6} flexWrap='wrap' justify='center'>
                                <Flex
                                    flexDirection='row'
                                    flexWrap='wrap'
                                    columnGap={{ base: 4, md: 4, '2xl': 6 }}
                                    rowGap={4}
                                    pb={4}
                                >
                                    {recipes.map((recipe: Recipie, index: number) => (
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
                    title={additionalInfo.title}
                    description={additionalInfo.description}
                    recipes={additionalInfo.recipes}
                />
            </Box>
        </>
    );
};
