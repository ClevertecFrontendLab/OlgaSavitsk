import { Container, Heading, Link, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { RoutePath } from '~/app/routes/routes.constants';
import notFoundIcon from '~/assets/icons/not-found.svg';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

export const NotFoundPage = () => (
    <Container justifyContent='center' h='full' centerContent>
        <CustomIcon icon={notFoundIcon} boxSize={206} />
        <Heading fontSize='2xl' as='h1' mb={4} mt={8}>
            Упс! Такой страницы нет
        </Heading>
        <Text fontSize='md' color='blackAlpha.700'>
            Можете поискать другой рецепт{' '}
            <Link
                as={NavLink}
                to={RoutePath.mainPage}
                textDecoration='underline'
                data-test-id={DATA_TEST_ID.ERROR_PAGE}
            >
                здесь.
            </Link>
        </Text>
    </Container>
);
