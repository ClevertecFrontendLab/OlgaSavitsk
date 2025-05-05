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
import { Fragment, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { RELEVANT_PER_PAGE } from '~/constants/recipes.constants';
import { useGetRecipeByCategoryQuery, useGetRecipesQuery } from '~/query/services/recipes';
import { HeaderPage } from '~/shared/components/header-page';
import { useFilteredData } from '~/shared/hooks/filter.hook';
import { SubCategory } from '~/shared/types/category.types';
import { Recipe } from '~/shared/types/recipe.types';
import { isArrayWithItems } from '~/shared/utils/common';
import { selectCategories } from '~/store/category-slice';
import { hasActiveFiltersSelector } from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';

import classes from './index.module.css';

export const CategoryPage = () => {
    const { category, subcategory } = useParams();
    const navigate = useNavigate();
    const { categories } = useSelector(selectCategories);

    const { currentCategory, currentSubCategory } = useMemo(() => {
        const foundCategory = categories.find((cat) => cat.category === category);
        const foundSubCategory = foundCategory?.subCategories?.find(
            (subCat: SubCategory) => subCat.category === subcategory,
        );

        return {
            currentCategory: foundCategory,
            currentSubCategory: foundSubCategory,
        };
    }, [categories, category, subcategory]);

    const { data } = useGetRecipesQuery({
        limit: RELEVANT_PER_PAGE,
        subcategoriesIds: currentCategory?.subCategories.map((subCat: SubCategory) => subCat._id),
    });

    const { data: subCategoryRecipesData } = useGetRecipeByCategoryQuery(
        currentSubCategory ? currentSubCategory._id : '',
        {
            skip: !currentSubCategory,
        },
    );

    const filteredRecipes = useFilteredData(subCategoryRecipesData);
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);

    const tabIndex = useMemo(() => {
        if (!currentCategory?.subCategories) return 0;
        return currentCategory.subCategories.findIndex(
            (sub) => sub._id === currentSubCategory?._id,
        );
    }, [currentCategory?.subCategories, currentSubCategory]);

    useEffect(() => {
        if (!currentCategory) {
            navigate(RoutePath.notFound);
            return;
        }
    }, [currentCategory, navigate]);

    if (!currentCategory?.subCategories) {
        return <div>Category not found</div>;
    }

    return (
        <>
            <HeaderPage title={currentCategory?.title} subTitle={currentCategory?.description} />
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
                        {currentCategory?.subCategories?.map(({ title, category }, index) => (
                            <Tab
                                key={index}
                                as={Link}
                                to={`/${currentCategory?.category}/${category}`}
                                whiteSpace='nowrap'
                                fontSize={{ base: 'sm', md: 'sm', lg: 'md' }}
                                color='lime.800'
                                sx={{ marginBottom: 0 }}
                                _focus={{ boxShadow: 'none' }}
                                data-test-id={`tab-${category}-${index}`}
                                aria-selected={tabIndex === index}
                            >
                                {title}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {currentCategory?.subCategories?.map((_, index) => (
                            <TabPanel p={0} key={index}>
                                <HStack pt={6} flexWrap='wrap' justify='center'>
                                    <Flex
                                        flexDirection='row'
                                        flexWrap='wrap'
                                        columnGap={{ base: 4, md: 4, '2xl': 6 }}
                                        rowGap={4}
                                        pb={4}
                                    >
                                        {isArrayWithItems(subCategoryRecipesData) &&
                                            subCategoryRecipesData.map(
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
                    title={currentCategory?.title}
                    description={currentCategory?.description}
                    recipes={data?.data}
                />
            </Box>
        </>
    );
};
