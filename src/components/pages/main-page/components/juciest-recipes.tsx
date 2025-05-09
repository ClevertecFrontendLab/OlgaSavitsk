import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Show, Spacer, useBreakpointValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import { DishCard } from '~/components/dish-card/dish-card';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { JUCIEST_PER_PAGE } from '~/constants/recipes.constants';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { isArrayWithItems } from '~/shared/utils/common';

export const JuiciestRecipes = () => {
    const navigate = useNavigate();
    const responsive = {
        titleSize: useBreakpointValue({ base: 'lg', md: 'md', lg: 'xl', '2xl': '2xl' }),
        isMobile: useBreakpointValue({ base: true, lg: false }),
        maxWidth: useBreakpointValue({ base: 328, md: 728, lg: 880, xl: 600, '2xl': 1360 }),
        buttonSize: useBreakpointValue({ base: 'md', lg: 'md', '2xl': 'lg' }),
        gap: useBreakpointValue({ base: 3, md: 4, lg: 4, '2xl': 6 }),
    };

    const { data: juciestRecipes } = useGetRecipesQuery({
        limit: JUCIEST_PER_PAGE,
        sortBy: 'likes',
        sortOrder: 'desc',
    });

    return (
        <>
            <Heading
                as='h2'
                size={responsive.titleSize}
                pb={{ base: 1, md: 2, lg: 4, '2xl': 6 }}
                letterSpacing={{ base: 0, md: 1.2 }}
            >
                Самое сочное
            </Heading>
            <Spacer />
            <Show above='sm'>
                <Button
                    size={responsive.buttonSize}
                    rightIcon={<ArrowForwardIcon />}
                    bg='lime.400'
                    onClick={() => navigate(RoutePath.delicious)}
                    data-test-id={DATA_TEST_ID.juiciestLink}
                >
                    Вся подборка
                </Button>
            </Show>
            <Flex
                flexDirection='row'
                flexWrap='wrap'
                maxW={responsive.maxWidth}
                gap={responsive.gap}
            >
                {isArrayWithItems(juciestRecipes?.data) &&
                    juciestRecipes.data.map((recipe, index) => (
                        <DishCard key={`juicy-${index}`} {...recipe} dataTestId={index} />
                    ))}
            </Flex>
            <Button
                display={responsive.isMobile ? 'flex' : 'none'}
                size={responsive.buttonSize}
                rightIcon={<ArrowForwardIcon />}
                bg='lime.400'
                onClick={() => navigate(RoutePath.delicious)}
                data-test-id={DATA_TEST_ID.juiciestLinkMobile}
            >
                Вся подборка
            </Button>
        </>
    );
};
