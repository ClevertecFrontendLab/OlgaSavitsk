import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { FC } from 'react';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { FilterType, Option } from '~/shared/types/filters';

type FilterTagProps = { label: string; variant?: string; onRemove?: () => void };

export const FilterTag: FC<FilterTagProps> = ({ label, variant = 'filterOutline', onRemove }) => (
    <Tag size='md' variant={variant} data-test-id={DATA_TEST_ID.FILTER_TAG}>
        <TagLabel>{label}</TagLabel>
        <TagCloseButton onClick={onRemove} color='lime.700' />
    </Tag>
);

type ActiveFilterTagsProps = {
    filters: {
        type: FilterType;
        items: string[] | Option[];
        removeAction: (item: string) => void;
    }[];
};

export const ActiveFilterTags: React.FC<ActiveFilterTagsProps> = ({ filters }) => {
    if (!filters.some((filter) => filter.items.length > 0)) {
        return null;
    }

    return (
        <HStack spacing={4} wrap='wrap'>
            {filters.map(({ items, removeAction }) =>
                items.map((item) => {
                    const { label, value } =
                        typeof item === 'string' ? { label: item, value: item } : item;
                    return (
                        <FilterTag
                            key={value}
                            label={label}
                            variant='filterSolid'
                            onRemove={() => removeAction(value)}
                        />
                    );
                }),
            )}
        </HStack>
    );
};
