import { Category, subMenus } from '~/constants/menu.constants';

export const getSubMenuLabel = (category: Category | undefined, snippet: string) => {
    if (!category) return;

    const subItems = subMenus[category as Category];
    const subItem = subItems?.find((item) => item.route === snippet);
    if (!subItem) return;
    return subItem.title;
};
