import { Box, Collapse, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Category, menuItems, subMenus } from '~/constants/menu.constants';

import { NavItem } from '../../../nav-item/nav-item';
import classes from './index.module.css';

export const Menu = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
        const path = location.pathname.split('/')[1] as Category;
        return menuItems.find((cat) => cat.id === path)?.id || null;
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
        <VStack align='stretch' flex={1} className={classes.activeContainer}>
            {menuItems.map(({ route: path, subItems, dataTestId, id, ...item }) => (
                <Box key={id} data-test-id={dataTestId}>
                    <NavItem
                        href={`${path}/0`}
                        isOpen={expandedCategory === id}
                        dataTestId={dataTestId}
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
                                />
                            ))}
                        </VStack>
                    </Collapse>
                </Box>
            ))}
        </VStack>
    );
};
