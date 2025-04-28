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
import { Fragment, useMemo } from 'react';
import { Link, useParams } from 'react-router';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { Category } from '~/constants/menu.constants';
import { HeaderPage } from '~/shared/components/header-page';
import { useFilteredData } from '~/shared/hooks/filter.hook';
import { recipes as recipesInfo } from '~/shared/mock-data/recipes';
import { Recipe } from '~/shared/types/recipe.types';
import { hasActiveFiltersSelector } from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';

import { pageConfig } from '../constants/page-config';
import classes from './index.module.css';

export const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const config = pageConfig[category as Category];

    const filteredBySubcategory = useMemo(() => {
        if (!subcategory || !config?.recipes) return config?.recipes || [];
        return recipesInfo.filter((recipe) => recipe.subcategory.includes(subcategory));
    }, [subcategory, recipesInfo]);

    const filteredRecipes = useFilteredData(filteredBySubcategory);
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);

    const tabIndex = useMemo(() => {
        if (!config || !config.subMenus) {
            return 0;
        }
        const foundMenu = config.subMenus.find(({ route }) => route === subcategory);
        return foundMenu ? foundMenu.id : 0;
    }, [config, subcategory]);

    if (!config) {
        return <div>Category not found</div>;
    }

    const { path, title, subTitle, subMenus, additionalInfo } = config;

    return (
        <>
            <HeaderPage title={title} subTitle={subTitle} />
            {hasActiveFilters ? (
                <Flex flexDirection='row' flexWrap='wrap' gap={{ base: 3, md: 4, lg: 4, '2xl': 6 }}>
                    {filteredRecipes.map((recipe, index) => (
                        <Fragment key={index}>
                            <DishCard {...recipe} dataTestId={index} />
                        </Fragment>
                    ))}
                </Flex>
            ) : (
                <Tabs index={tabIndex} colorScheme='lime' display='flex' flexDirection='column'>
                    <TabList
                        overflowX={{ base: 'auto', md: 'auto', lg: 'auto', '2xl': 'unset' }}
                        maxW={{ base: 360, md: 768, lg: '4xl' }}
                        className={classes.tabList}
                    >
                        {subMenus!.map(({ title, route }, index) => (
                            <Tab
                                key={index}
                                as={Link}
                                to={`${path}/${route}`}
                                whiteSpace='nowrap'
                                fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                                color='lime.800'
                                sx={{ marginBottom: 0 }}
                                _focus={{ boxShadow: 'none' }}
                                data-test-id={`tab-${route}-${index}`}
                                aria-selected={tabIndex === index}
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
                                        {filteredBySubcategory.map(
                                            (recipe: Recipe, index: number) => (
                                                <Fragment key={index}>
                                                    <DishCard {...recipe} dataTestId={index} />
                                                </Fragment>
                                            ),
                                        )}
                                    </Flex>
                                    <Button size={{ base: 'md', md: 'md', lg: 'lg' }} bg='lime.400'>
                                        Загрузить ещё
                                    </Button>
                                </HStack>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </Tabs>
            )}

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
