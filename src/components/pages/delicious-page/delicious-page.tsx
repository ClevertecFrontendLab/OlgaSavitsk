import { Box, Button, Divider, Flex, HStack } from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { DishCard } from '~/components/dish-card/dish-card';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { ITEMS_PER_PAGE } from '~/constants/recipes.constants';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { HeaderPage } from '~/shared/components/header-page';
import { Recipe, RecipeParams } from '~/shared/types/recipe.types';
import { isArrayWithItems } from '~/shared/utils/common';
import { useAppSelector } from '~/store/hooks';
import { selectHasMore, selectRecipes } from '~/store/recipe-slice';

export const DeliciousPage = () => {
    const recipes = useAppSelector(selectRecipes);
    const hasMore = useAppSelector(selectHasMore);
    const [pageParams, setPageParams] = useState<RecipeParams>({
        page: 1,
        limit: ITEMS_PER_PAGE,
        sortBy: 'likes',
        sortOrder: 'desc',
    });

    const { isFetching } = useGetRecipesQuery(pageParams);

    const handleLoadMore = () => {
        setPageParams((prev) => ({ ...prev, page: prev.page! + 1 }));
    };

    useEffect(() => {
        setPageParams({ ...pageParams, page: 1, limit: ITEMS_PER_PAGE });
    }, [pageParams]);

    return (
        <>
            <HeaderPage title='Самое сочное' />

            <HStack gap={4} flexWrap='wrap' justify='center'>
                <Flex
                    flexDirection='row'
                    flexWrap='wrap'
                    columnGap={{ base: 4, md: 4, '2xl': 6 }}
                    rowGap={4}
                >
                    {isArrayWithItems(recipes) &&
                        recipes.map((recipe: Recipe, index: number) => (
                            <Fragment key={index}>
                                <DishCard {...recipe} />
                            </Fragment>
                        ))}
                </Flex>
                {hasMore && !isFetching && (
                    <Button
                        size={{ base: 'md', lg: 'md' }}
                        bg='lime.400'
                        onClick={handleLoadMore}
                        disabled={isFetching}
                        data-test-id={DATA_TEST_ID.LOAD_MORE_BTN}
                    >
                        Загрузка
                    </Button>
                )}
            </HStack>

            <Box pt={{ base: 8, md: 8, lg: 10 }}>
                <Divider pb={{ md: 2 }} />
                <AdditionalBlock
                    title='Веганская кухня'
                    description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                    recipes={recipes}
                />
            </Box>
        </>
    );
};
