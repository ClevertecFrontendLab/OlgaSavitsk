import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';

import { breadcrumbNameMap, RoutePath } from '~/app/routes/routes.constants';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { getCurrentRoute } from '~/shared/utils/get-current-route';
import { getSubMenuTitle } from '~/shared/utils/get-label';
import { selectCategories } from '~/store/category-slice';

export const Breadcrumbs = () => {
    const { id } = useParams();
    const location = useLocation();
    const pathSnippets = getCurrentRoute(location).filter(Boolean);
    const { categories } = useSelector(selectCategories);
    const { data } = useGetRecipeByIdQuery(id || '', { skip: !id });

    const breadcrumbItems = useMemo(
        () =>
            pathSnippets.map((snippet, index) => {
                const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

                const category = categories?.find((item) => item.category === `${pathSnippets[0]}`);
                const mainMenu = breadcrumbNameMap[url] || category?.title;
                const subMenu = category?.subCategories
                    ? getSubMenuTitle(category.subCategories, snippet)
                    : undefined;
                const isLast = index === pathSnippets.length - 1;

                const displayName = isLast && data ? data.title : index === 0 ? mainMenu : subMenu;

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
        [pathSnippets, categories, data],
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
