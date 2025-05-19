import { Flex, useBreakpointValue } from '@chakra-ui/react';

import { DishCard } from '~/components/dish-card/dish-card';
import { useFilteredData } from '~/shared/hooks/filter.hook';

export const FilteredRecipes = () => {
    const { filteredData } = useFilteredData();
    const responsive = {
        maxWidth: useBreakpointValue({ base: 328, md: 728, lg: 880, xl: 600, '2xl': 1360 }),
        gap: useBreakpointValue({ base: 3, md: 4, lg: 4, '2xl': 6 }),
    };

    return (
        <Flex flexDirection='row' flexWrap='wrap' maxW={responsive.maxWidth} gap={responsive.gap}>
            {filteredData.map((recipe, index) => (
                <DishCard key={index} {...recipe} dataTestId={index} />
            ))}
        </Flex>
    );
};
