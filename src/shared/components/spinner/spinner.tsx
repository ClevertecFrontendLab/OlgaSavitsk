import { Center, Spinner } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { GRADIENT_STYLES } from '~/constants/menu.constants';
import { DEFAULT_PAGE_NUMBER, SLIDES_PER_PAGE } from '~/constants/recipes.constants';
import { useGetRecipesQuery } from '~/query/services/recipes';

export const SpinnerComponent = () => {
    const { isLoading } = useGetRecipesQuery({
        page: DEFAULT_PAGE_NUMBER,
        limit: SLIDES_PER_PAGE,
        sortBy: 'createdAt',
    });

    if (!isLoading) return null;

    return (
        <Center
            position='fixed'
            top={0}
            left={0}
            w='100vw'
            h='100vh'
            bg='blackAlpha.300'
            backdropFilter='blur(2px)'
            zIndex={10}
            data-test-id={DATA_TEST_ID.APP_LOADER}
        >
            <Center w={206} h={206} {...GRADIENT_STYLES}>
                <Spinner />
            </Center>
        </Center>
    );
};
