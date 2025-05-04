import { Box, Collapse, VStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { Category } from '~/constants/menu.constants';
import { CategoryItem, SubCategory } from '~/shared/types/navigation.types';
import { isArrayWithItems } from '~/shared/utils/common';
import { getCurrentRoute } from '~/shared/utils/get-current-route';

import { NavItem } from '../../../nav-item/nav-item';
import classes from './index.module.css';

type MenuProps = {
    menuItems: CategoryItem[];
    dataTestId: string;
};

export const Menu: FC<Partial<MenuProps>> = ({ menuItems, dataTestId }) => {
    const location = useLocation();

    const navigate = useNavigate();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
        const currentCategoryPath = getCurrentRoute(location).at(1);
        return (
            (isArrayWithItems(menuItems) &&
                menuItems.find((cat) => cat.category === currentCategoryPath)?.category) ||
            null
        );
    });

    const getCurrentSubCategoryRoute = () => getCurrentRoute(location).at(2);

    const handleCategoryClick = (subCategories: SubCategory[], category: string) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(category);
            const firstSubmenuRoute = subCategories?.[0]?.category || '0';
            navigate(`/${category}/${firstSubmenuRoute}`);
        }
    };

    const handleSubmenuClick = (category: string, route: string) =>
        navigate(`${category}/${route}`);

    const getNavItemClass = (id: string) =>
        `${classes.navitem} ${expandedCategory === id ? classes.active : ''}`;

    const getSubItemClass = (route: string) =>
        `${classes.navitemborder} ${getCurrentSubCategoryRoute() === route ? classes.active : ''}`;

    return (
        <VStack
            align='stretch'
            flex={1}
            className={classes.activeContainer}
            data-test-id={dataTestId}
        >
            {isArrayWithItems(menuItems) &&
                menuItems.map(({ _id, category: mainCategory, subCategories, ...item }) => (
                    <Box key={_id}>
                        <NavItem
                            href={`${mainCategory}/${subCategories[0].category}`}
                            isOpen={expandedCategory === _id}
                            dataTestId={
                                mainCategory === Category.Vegan ? DATA_TEST_ID.veganCuisine : ''
                            }
                            rightIcon
                            className={getNavItemClass(_id)}
                            onClick={() => handleCategoryClick(subCategories, mainCategory)}
                            {...item}
                        />
                        <Collapse in={expandedCategory === mainCategory} animateOpacity>
                            <VStack pl={10} align='stretch' spacing={2} pt={2}>
                                {subCategories?.map(({ title, category }) => (
                                    <NavItem
                                        key={category}
                                        href={`${mainCategory}/${category}`}
                                        title={title}
                                        className={getSubItemClass(category)}
                                        onClick={() => handleSubmenuClick(category, category)}
                                        dataTestId={
                                            getCurrentSubCategoryRoute() === category
                                                ? `${category}-active`
                                                : ''
                                        }
                                        attr={getCurrentSubCategoryRoute() === category}
                                    />
                                ))}
                            </VStack>
                        </Collapse>
                    </Box>
                ))}
        </VStack>
    );
};
