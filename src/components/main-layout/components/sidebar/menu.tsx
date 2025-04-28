import { Box, Collapse, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { Category, subMenus } from '~/constants/menu.constants';
import { isArrayWithItems } from '~/shared/utils/common';

import { NavItem } from '../../../nav-item/nav-item';
import classes from './index.module.css';

type MenuProps = {
    menuItems?: {
        id: Category;
        label: string;
        icon: string;
        route: string | undefined;
        subItems:
            | {
                  title: string;
                  route: string;
                  id: number;
              }[]
            | undefined;
    }[];
    dataTestId?: string;
};

export const Menu: FC<MenuProps> = ({ menuItems, dataTestId }) => {
    const location = useLocation();

    const navigate = useNavigate();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
        const path = location.pathname.split('/')[1] as Category;
        return (
            (isArrayWithItems(menuItems) && menuItems.find((cat) => cat.id === path)?.id) || null
        );
    });

    const handleCategoryClick = (category: Category, route: string) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(category);
            const firstSubmenuRoute = subMenus[category]?.[0]?.route || '0';
            navigate(`/${route}/${firstSubmenuRoute}`);
        }
    };

    const handleSubmenuClick = (category: string, route: string) => {
        navigate(`${category}/${route}`);
    };

    const getCurrentRoute = () => {
        const pathParts = location.pathname.split('/');
        return pathParts[2] || '0';
    };

    const getNavItemClass = (id: string) => {
        const baseClass = classes.navitem;
        return expandedCategory === id ? `${baseClass} ${classes.active}` : baseClass;
    };

    const getSubItemClass = (route: string) => {
        const baseClass = classes.navitemborder;
        return getCurrentRoute() === route ? `${baseClass} ${classes.active} ` : baseClass;
    };

    return (
        <VStack
            align='stretch'
            flex={1}
            className={classes.activeContainer}
            data-test-id={dataTestId}
        >
            {isArrayWithItems(menuItems) &&
                menuItems.map(({ route: path, subItems, id, ...item }) => (
                    <Box key={id}>
                        <NavItem
                            href={`${path}/${isArrayWithItems(subItems) && subItems[0].route}`}
                            isOpen={expandedCategory === id}
                            dataTestId={path === Category.Vegan ? DATA_TEST_ID.veganCuisine : ''}
                            rightIcon
                            className={getNavItemClass(id)}
                            onClick={() => handleCategoryClick(id, path!)}
                            {...item}
                        />
                        <Collapse in={expandedCategory === id} animateOpacity>
                            <VStack pl='8' align='stretch' spacing='2' pt={2}>
                                {subItems?.map(({ title, route }) => (
                                    <NavItem
                                        key={route}
                                        href={`${path}/${route}`}
                                        label={title}
                                        className={getSubItemClass(route)}
                                        onClick={() => handleSubmenuClick(route!, route)}
                                        dataTestId={
                                            getCurrentRoute() === route ? `${route}-active` : ''
                                        }
                                        attr={getCurrentRoute() === route}
                                    />
                                ))}
                            </VStack>
                        </Collapse>
                    </Box>
                ))}
        </VStack>
    );
};
