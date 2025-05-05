import { Avatar, Flex, Tag, TagLabel } from '@chakra-ui/react';
import { FC } from 'react';

import { CategoryItem } from '~/shared/types/category.types';
import { Blog } from '~/shared/types/page-config.types';

import { CustomIcon } from '../custom-icon/custom-icon';

type PositionType = 'static' | 'absolute' | undefined;

type CustomTagProps = {
    color: string;
    category?: CategoryItem;
    position?: PositionType;
    blog?: Blog | null;
};

export const CustomTag: FC<CustomTagProps> = ({
    category,
    blog = null,
    color,
    position = 'static',
}) => {
    const isBlog = Object.values({ ...blog }).length;
    if (!isBlog && !category) return;

    if (isBlog) {
        return (
            <Flex justify='center' position={position} bottom={5} left={6}>
                <Tag size='md' variant='subtle' bg={color} borderRadius={4}>
                    <Avatar src={blog?.avatar} size='2xs' ml={-1} mr={2} />
                    <TagLabel fontWeight={400}>{blog?.name} рекомендует</TagLabel>
                </Tag>
            </Flex>
        );
    }

    return (
        <Tag
            size='md'
            variant='subtle'
            bg={color}
            position={position}
            top={2}
            left={2}
            borderRadius={4}
        >
            <CustomIcon icon={category?.icon} boxSize={4} />
            <TagLabel pl={{ md: 0.5, lg: 2 }} fontWeight={400} whiteSpace='nowrap'>
                {category?.title}
            </TagLabel>
        </Tag>
    );
};
