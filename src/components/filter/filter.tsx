import { Hide, HStack, IconButton, Stack, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import filterIcon from '~/assets/icons/filter.svg';
import { DATA_TEST_ID } from '~/constants/data-test-id';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';
import { SpinnerComponent } from '~/shared/components/spinner/spinner';
import {
    applyFilters,
    resetFilters,
    searchTextSelector,
    setAllergen,
    setSearchText,
} from '~/store/filter-slice';
import { useAppSelector } from '~/store/hooks';
import { selectLoadingFilter } from '~/store/recipe-slice';
import { SearchComponent } from '~/widgets/search/search';

import { AllergensFilter } from './components/allergens-filter';
import { FilterDrawer } from './components/drawer-filter';

export const Filter = () => {
    const dispatch = useDispatch();
    const searchText = useAppSelector(searchTextSelector);
    const isLoading = useAppSelector(selectLoadingFilter);
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleSearch = (text: string | null) => {
        if (text) {
            dispatch(setSearchText(text));
        } else {
            dispatch(setAllergen(selectedAllergens));
            dispatch(applyFilters());
        }
    };

    const handleOpenFilter = () => {
        onOpen();
        dispatch(resetFilters());
    };

    return isLoading ? (
        <SpinnerComponent
            isLoading={isLoading}
            size={134}
            dataTestId={DATA_TEST_ID.LOADER_SEARCH}
            fixed={false}
        />
    ) : (
        <>
            <Stack
                spacing={4}
                pt={{ base: 4, lg: 8 }}
                maxW={{ sm: 344, md: 448, lg: 'full' }}
                w='full'
                mx='auto'
            >
                <HStack spacing={3}>
                    <IconButton
                        ref={btnRef}
                        onClick={handleOpenFilter}
                        aria-label='Sort'
                        variant='outline'
                        borderColor='blackAlpha.600'
                        size={{ base: 'sm', lg: 'lg', '2xl': 'lg' }}
                        p={{ base: 0, md: 0 }}
                        icon={<CustomIcon icon={filterIcon} boxSize={{ base: 4, lg: 6 }} />}
                        data-test-id={DATA_TEST_ID.FILTER_BUTTON}
                    />

                    <SearchComponent onSearch={handleSearch} initialValue={searchText} />
                </HStack>

                <Hide below='md'>
                    <AllergensFilter
                        selectedAllergens={selectedAllergens}
                        setSelectedAllergens={setSelectedAllergens}
                    />
                </Hide>
            </Stack>
            <FilterDrawer isOpen={isOpen} onClose={onClose} />
        </>
    );
};
