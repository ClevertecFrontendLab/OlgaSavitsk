import { FormLabel, HStack, Stack, Switch } from '@chakra-ui/react';
import { ChangeEvent, FC, useState } from 'react';

import { DATA_TEST_ID } from '~/constants/data-test-id';

import { MultiSelectFilter } from '../../../shared/components/multi-select';
import { allergensList } from '../constants';

type AllergensFilterProps = {
    selectedAllergens: string[];
    mode?: string;
    setSelectedAllergens: (allergens: string[]) => void;
};

export const AllergensFilter: FC<AllergensFilterProps> = ({
    selectedAllergens,
    mode = 'filter',
    setSelectedAllergens,
}) => {
    const [isAllergens, setIsAllergens] = useState(false);
    const isFilterMode = mode === 'filter';

    const handleSwitcher = (e: ChangeEvent<HTMLInputElement>) => {
        setIsAllergens(e.target.checked);
        setSelectedAllergens([]);
    };

    return (
        <Stack
            direction={isFilterMode ? 'row' : 'column'}
            display={{ base: isFilterMode ? 'none' : 'flex', lg: 'flex' }}
            spacing={4}
        >
            <HStack>
                <FormLabel htmlFor='allergens' whiteSpace='nowrap' mb={0}>
                    Исключить мои аллергены
                </FormLabel>

                <Switch
                    id='allergens'
                    isChecked={Boolean(selectedAllergens.length) || isAllergens}
                    onChange={handleSwitcher}
                    data-test-id={
                        isFilterMode
                            ? DATA_TEST_ID.ALLERGEN_SWITCHER
                            : DATA_TEST_ID.ALLERGEN_SWITCHER_FILTER
                    }
                />
            </HStack>
            <MultiSelectFilter
                isActive={isAllergens}
                selectedItems={selectedAllergens}
                onSelect={setSelectedAllergens}
                options={allergensList}
                mode={mode}
                placeholder='Выберите из списка...'
                dataTestId={DATA_TEST_ID.ALLERGEN_BUTTON_FILTER}
            />
        </Stack>
    );
};
