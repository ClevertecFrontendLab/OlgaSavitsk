import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { Category, categoryMap } from '~/constants/menu.constants';
import { breadcrumbNameMap, RoutePath } from '~/constants/routes.constants';
import { getSubMenuLabel } from '~/utils/get-label';

export const Breadcrumbs = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(Boolean);

    const breadcrumbItems = pathSnippets.map((snippet, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const mainMenu = breadcrumbNameMap[url];
        const category = Object.values(Category).find(
            (cat) => categoryMap[cat].route === `/${pathSnippets[0]}`,
        );
        const subMenu = getSubMenuLabel(category, snippet);
        const isLast = index === pathSnippets.length - 1;

        return (
            <BreadcrumbItem key={url}>
                <BreadcrumbLink href={url} color={isLast ? 'black' : 'blackAlpha.700'}>
                    {index === 0 ? mainMenu : subMenu}
                </BreadcrumbLink>
            </BreadcrumbItem>
        );
    });

    return (
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} ml={16}>
            <BreadcrumbItem>
                <BreadcrumbLink href={RoutePath.mainPage}>Главная</BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbItems}
        </Breadcrumb>
    );
};
