import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router';

import { breadcrumbNameMap, RoutePath } from '~/app/routes/routes.constants';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { recipes } from '~/shared/mock-data/recipes';
import { getCurrentRoute } from '~/shared/utils/get-current-route';
import { getSubMenuTitle } from '~/shared/utils/get-label';

export const Breadcrumbs = () => {
    const { data } = useGetCategoriesQuery();
    const location = useLocation();
    const { id } = useParams();
    const pathSnippets = getCurrentRoute(location).filter(Boolean);
    const recipe = id ? recipes.find((recipe) => recipe.id === id) : null;

    const breadcrumbItems = useMemo(
        () =>
            pathSnippets.map((snippet, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

                const category = data?.find((item) => item.category === `${pathSnippets[0]}`);
                const mainMenu = breadcrumbNameMap[url] || category?.title;

                const subMenu = category?.subCategories
                    ? getSubMenuTitle(category.subCategories, snippet)
                    : undefined;
                const isLast = index === pathSnippets.length - 1;

                const displayName =
                    isLast && recipe ? recipe.title : index === 0 ? mainMenu : subMenu;

                return (
                    <BreadcrumbItem key={url}>
                        <BreadcrumbLink
                            href={url}
                            color={isLast ? 'black' : 'blackAlpha.700'}
                            fontSize={{ base: 'md', lg: 'lg' }}
                            whiteSpace='nowrap'
                            isCurrentPage={isLast}
                        >
                            {displayName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            }),
        [pathSnippets],
    );

    return (
        <Breadcrumb
            separator={<ChevronRightIcon color='gray.500' />}
            ml={{ base: 0, lg: 16 }}
            data-test-id={DATA_TEST_ID.BREADCRUMBS}
        >
            <BreadcrumbItem>
                <BreadcrumbLink
                    href={RoutePath.mainPage}
                    fontSize={{ base: 'md', lg: 'lg' }}
                    whiteSpace='nowrap'
                >
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbItems}
        </Breadcrumb>
    );
};
