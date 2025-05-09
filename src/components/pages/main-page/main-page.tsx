import { Box, Divider, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useMemo } from 'react';

import { AdditionalBlock } from '~/components/additional-block/additional-block';
import { RELEVANT_PER_PAGE } from '~/constants/recipes.constants';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipeByCategoryQuery } from '~/query/services/recipes';
import { HeaderPage } from '~/shared/components/header-page';
import { getRandomCategory } from '~/shared/utils/category';
import { hasActiveFiltersSelector } from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';
import { Slider } from '~/widgets/slider/slider';

import { BlogSection } from './components/blog-section';
import { FilteredRecipes } from './components/filtered-recipes';
import { JuiciestRecipes } from './components/juciest-recipes';

export const MainPage = () => {
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const { data: categories } = useGetCategoriesQuery();

    const randomCategory = useMemo(
        () => (categories ? getRandomCategory(categories) : null),
        [categories],
    );

    const { data: relevantRecipes } = useGetRecipeByCategoryQuery(
        {
            id: randomCategory?.subCategories[0]?._id || undefined,
            limit: RELEVANT_PER_PAGE,
        },
        {
            skip: !randomCategory,
        },
    );

    return (
        <>
            <HeaderPage title='Приятного аппетита!' />

            {hasActiveFilters ? (
                <FilteredRecipes />
            ) : (
                <>
                    <Box pt={{ base: 0, lg: 6 }}>
                        <Slider />
                    </Box>
                    <HStack pt={{ base: 8, lg: 10 }} flexWrap='wrap' justify='center'>
                        <JuiciestRecipes />
                    </HStack>
                    <Box pt={isMobile ? 8 : 10}>
                        <BlogSection />
                    </Box>
                    <Box pt={{ base: 8, lg: 10 }}>
                        <Divider pb={{ md: 2 }} />
                        <AdditionalBlock
                            title={randomCategory?.title}
                            description={randomCategory?.description}
                            recipes={relevantRecipes}
                        />
                    </Box>
                </>
            )}
        </>
    );
};
