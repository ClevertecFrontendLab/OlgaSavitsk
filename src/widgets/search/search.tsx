import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FC, useState } from 'react';

import SearchIcon from '~/assets/icons/search.svg';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

type SearchComponentProps = {
    initialValue: string | null;
    onSearch: (text: string | null) => void;
};

export const SearchComponent: FC<SearchComponentProps> = ({ initialValue = '', onSearch }) => {
    const [value, setValue] = useState(initialValue);
    const isSearchDisabled = value?.length && value.length < 3;

    const handleKeyPress = (e: { key: string }) => {
        if (e.key === 'Enter' && !isSearchDisabled) {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (!isSearchDisabled) {
            onSearch(value);
        }
    };

    return (
        <InputGroup size={{ base: 'sm', lg: 'lg', '2xl': 'lg' }}>
            <Input
                placeholder='Название или ингредиент...'
                borderColor='blackAlpha.600'
                borderRadius={6}
                _placeholder={{ color: 'lime.800' }}
                onKeyPress={handleKeyPress}
                value={value!}
                onChange={(e) => setValue(e.target.value)}
                data-test-id={DATA_TEST_ID.SEARCH_INPUT}
            />
            <InputRightElement>
                <IconButton
                    icon={<CustomIcon icon={SearchIcon} boxSize={5} />}
                    size='md'
                    onClick={() => onSearch(value)}
                    aria-label='search'
                    variant='ghost'
                    isDisabled={Boolean(isSearchDisabled)}
                    _disabled={{
                        pointerEvents: 'none',
                    }}
                    data-test-id={DATA_TEST_ID.SEARCH_BUTTON}
                />
            </InputRightElement>
        </InputGroup>
    );
};
