import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router';

import { breadcrumbNameMap, RoutePath } from '~/app/routes/routes.constants';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { Category, categoryMap } from '~/constants/menu.constants';
import { recipes } from '~/shared/mock-data/recipes';
import { getSubMenuLabel } from '~/utils/get-label';

export const Breadcrumbs = () => {
    const location = useLocation();
    const { id } = useParams();
    const pathSnippets = location.pathname.split('/').filter(Boolean);
    const recipe = id ? recipes.find((recipe) => recipe.id === id) : null;

    const breadcrumbItems = pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const mainMenu = breadcrumbNameMap[url] || categoryMap[snippet as Category]?.label;
        const category = Object.values(Category).find(
            (cat) => categoryMap[cat].route === `${pathSnippets[0]}`,
        );
        const subMenu = getSubMenuLabel(category, snippet);
        const isLast = index === pathSnippets.length - 1;

        const displayName = isLast && recipe ? recipe.title : index === 0 ? mainMenu : subMenu;

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
    });

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
