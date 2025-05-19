import avatar from '~/assets/images/avatar.png';
import avatar2 from '~/assets/images/avatar2.png';
import avatar3 from '~/assets/images/avatar3.png';
import { Blog } from '~/shared/types/page-config.types';

export const blogPosts: Array<Blog> = [
    {
        id: 1,
        name: 'Елена Высоцкая',
        username: '@elenapower',
        avatar: avatar2,
        content:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        id: 2,
        name: 'Alex Cook',
        username: '@funfastcooking',
        avatar: avatar3,
        content:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
    {
        id: 3,
        name: 'Екатерина Константинопольская',
        username: '@bake_and_pie',
        avatar: avatar,
        content:
            'Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.',
    },
];
