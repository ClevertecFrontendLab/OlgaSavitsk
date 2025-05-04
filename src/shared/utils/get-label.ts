import { SubCategory } from '~/shared/types/navigation.types';

export const getSubMenuTitle = (subCategories: SubCategory[], snippet: string) => {
    const subItem = subCategories?.find((item) => item.category === snippet);
    if (!subItem) return;
    return subItem.title;
};
