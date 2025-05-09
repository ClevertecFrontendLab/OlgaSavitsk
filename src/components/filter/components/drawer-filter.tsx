import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DATA_TEST_ID } from '~/constants/data-test-id';
import { FilterType } from '~/shared/types/filters';
import { selectCategories } from '~/store/category-slice';
import {
    applyFilters,
    removeAllergen,
    resetFilters,
    selectAllergens,
    selectAuthors,
    selectCategory,
    selectMeatTypes,
    selectSideDishes,
    setAllergen,
    setAuthors,
    setCategory,
    setMeatTypes,
    setSideDishes,
} from '~/store/filter-slice';

import { MultiSelectFilter } from '../../../shared/components/multi-select';
import { meatOptions, sideDishOptions } from '../constants';
import { AllergensFilter } from './allergens-filter';
import { FilterCheckboxGroup } from './filter-checkbox';
import { ActiveFilterTags } from './filter-tag';

export const FilterDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const dispatch = useDispatch();
    const selectedAllergens = useSelector(selectAllergens);
    const meatTypes = useSelector(selectMeatTypes);
    const sideDishes = useSelector(selectSideDishes);
    const selectedAuthors = useSelector(selectAuthors);
    const selectedCategories = useSelector(selectCategory);
    const { categories } = useSelector(selectCategories);

    const categoryOptions = useMemo(
        () => categories.map((category) => ({ label: category.title, value: category._id })),
        [categories],
    );

    const styles = useBreakpointValue({
        base: {
            content: { maxWidth: '100%', width: '100vw' },
            header: { px: 3, py: 3 },
            body: { px: 3, py: 0 },
            footer: { px: 3, py: 3 },
            button: { top: 3, right: 3 },
        },
        sm: {
            content: { maxWidth: 'full ' },
            header: { px: 4, py: 4 },
            body: { px: 4, py: 0 },
            footer: { px: 4, py: 3 },
            button: { top: 4, right: 4 },
        },
        md: {
            content: { maxWidth: '463px', width: 'full' },
            header: { px: 8, py: 8 },
            body: { px: 8, py: 0 },
            footer: { px: 8, py: 4 },
            button: { top: 8, right: 4 },
        },
    });

    const handleFilterClick = () => {
        dispatch(applyFilters());
        onClose();
    };

    const reseFiltert = () => {
        dispatch(resetFilters());
    };

    const activeFilters = [
        {
            type: FilterType.MEAT,
            items: meatTypes,
            removeAction: (type: string) =>
                dispatch(setMeatTypes(meatTypes.filter((t) => t !== type))),
        },
        {
            type: FilterType.SIDE_DISH,
            items: sideDishes,
            removeAction: (dish: string) =>
                dispatch(setSideDishes(sideDishes.filter((d) => d !== dish))),
        },
        {
            type: FilterType.ALLERGEN,
            items: selectedAllergens,
            removeAction: removeAllergen,
        },
        {
            type: FilterType.AUTHOR,
            items: selectedAuthors,
            removeAction: (author: string) =>
                dispatch(setAuthors(selectedAuthors.filter((a) => a !== author))),
        },
        {
            type: FilterType.CATEGORY,
            items: selectedCategories,
            removeAction: (category: string) =>
                dispatch(setCategory(selectedCategories.filter((c) => c !== category))),
        },
    ];

    const hasActiveFilters = activeFilters.some((filter) => filter.items.length > 0);

    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose} variant='responsive'>
            <DrawerOverlay />
            <DrawerContent {...styles?.content} data-test-id={DATA_TEST_ID.FILTER_DRAWER}>
                <DrawerCloseButton
                    {...styles?.button}
                    bg='black'
                    borderRadius='full'
                    color='white'
                    size='sm'
                    data-test-id='close-filter-drawer'
                />
                <DrawerHeader {...styles?.header}>Фильтр</DrawerHeader>

                <DrawerBody {...styles?.body}>
                    <VStack spacing={6} align='stretch' h='full'>
                        <MultiSelectFilter
                            isActive={true}
                            selectedItems={selectedCategories}
                            onSelect={(category) => dispatch(setCategory(category))}
                            options={categoryOptions}
                            mode='drawer'
                            isCategory={true}
                            placeholder='Категория'
                            dataTestId='filter-menu-button-категория'
                        />

                        <MultiSelectFilter
                            isActive={true}
                            selectedItems={selectedAuthors}
                            onSelect={(authors) => dispatch(setAuthors(authors))}
                            mode='drawer'
                            placeholder='Поиск по автору'
                        />

                        <FilterCheckboxGroup
                            title='Тип мяса:'
                            options={meatOptions}
                            selected={meatTypes}
                            onChange={(meat) => dispatch(setMeatTypes(meat))}
                        />

                        <FilterCheckboxGroup
                            title='Тип гарнира:'
                            options={sideDishOptions}
                            selected={sideDishes}
                            onChange={(dish) => dispatch(setSideDishes(dish))}
                        />

                        <Box flex={1}>
                            <AllergensFilter
                                selectedAllergens={selectedAllergens}
                                mode='drawer'
                                setSelectedAllergens={(allergen) => dispatch(setAllergen(allergen))}
                            />
                        </Box>

                        <ActiveFilterTags filters={activeFilters} />
                    </VStack>
                </DrawerBody>

                <DrawerFooter {...styles?.footer}>
                    <HStack spacing={4} w='full'>
                        <Button
                            variant='outline'
                            onClick={reseFiltert}
                            flex={1}
                            isDisabled={!hasActiveFilters}
                            data-test-id='clear-filter-button'
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            bg='blackAlpha.900'
                            color='white'
                            onClick={handleFilterClick}
                            flex={1}
                            isDisabled={!hasActiveFilters}
                            _disabled={{ pointerEvents: 'none' }}
                            data-test-id={DATA_TEST_ID.FIND_RECIPE_BUTTON}
                        >
                            Найти рецепт
                        </Button>
                    </HStack>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
