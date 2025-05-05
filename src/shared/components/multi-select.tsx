import { AddIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    HStack,
    IconButton,
    Input,
    InputGroup,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuOptionGroup,
    Text,
} from '@chakra-ui/react';
import { FC, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { DATA_TEST_ID } from '~/constants/data-test-id';

import { FilterTag } from '../../components/filter/components/filter-tag';
import { isArrayWithItems } from '../utils/common';

interface MultiSelectFilterProps {
    isActive: boolean;
    selectedItems: string[];
    options: string[];
    mode?: string;
    placeholder?: string;
    dataTestId?: string;
    onSelect: (items: string[]) => void;
}

export const MultiSelectFilter: FC<MultiSelectFilterProps> = ({
    isActive,
    selectedItems,
    options,
    mode = 'filter',
    placeholder = 'Выберите из списка...',
    dataTestId,
    onSelect,
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [customItem, setCustomItem] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const isFilterMode = mode === 'filter';

    const handleAdd = (item: string) => {
        if (!selectedItems.includes(item)) {
            onSelect([...selectedItems, item]);
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    };

    const handleRemove = (item: string) => {
        onSelect(selectedItems.filter((selectItem) => selectItem !== item));
    };

    const handleAddCustom = () => {
        const value = customItem.trim();
        if (value) {
            handleAdd(value);
            setCustomItem('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustom();
        }
    };

    useEffect(() => {
        if (!isActive) {
            onSelect([]);
        }
    }, [isActive, onSelect]);

    return (
        <Box>
            <Menu
                closeOnSelect={false}
                onOpen={() => setIsMenuOpen(true)}
                onClose={() => setIsMenuOpen(false)}
            >
                <MenuButton
                    px={4}
                    py={2}
                    borderRadius='md'
                    borderWidth='1px'
                    w={isFilterMode ? 269 : 'full'}
                    h='full'
                    as={Button}
                    rightIcon={isMenuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    isDisabled={!isActive}
                    sx={{
                        background: 'transparent',
                        _active: { background: 'transparent' },
                        _expanded: { borderColor: 'lime.400' },
                    }}
                    data-test-id={isFilterMode ? 'allergens-menu-button' : dataTestId}
                >
                    {isArrayWithItems(selectedItems) && isFilterMode ? (
                        <HStack wrap='wrap' gap={[2, 1]}>
                            {selectedItems.map((item) => (
                                <FilterTag key={item} label={item} />
                            ))}
                        </HStack>
                    ) : (
                        <Text textAlign='left' color='blackAlpha.700'>
                            {placeholder}
                        </Text>
                    )}
                </MenuButton>
                {isMenuOpen && (
                    <MenuList
                        borderTopRadius={0}
                        zIndex={10}
                        p={0}
                        w={isFilterMode ? 269 : 'full'}
                        data-test-id={isFilterMode ? 'allergens-menu' : ''}
                    >
                        <MenuOptionGroup>
                            {options.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    bg={index % 2 !== 0 ? 'transparent' : 'blackAlpha.100'}
                                >
                                    <Checkbox
                                        size='sm'
                                        colorScheme='lime'
                                        isChecked={selectedItems.includes(option)}
                                        onChange={() => {
                                            selectedItems.includes(option)
                                                ? handleRemove(option)
                                                : handleAdd(option);
                                        }}
                                        sx={{
                                            '& > span:first-of-type': {
                                                '&[data-checked]': {
                                                    borderColor: 'lime.400',
                                                    backgroundColor: 'lime.400',
                                                },
                                            },
                                            '& > span:first-of-type > span': {
                                                color: 'black',
                                            },
                                        }}
                                        data-test-id={
                                            option === 'Веганская кухня'
                                                ? 'checkbox-веганская кухня'
                                                : `allergen-${index}`
                                        }
                                    >
                                        {option}
                                    </Checkbox>
                                </MenuItem>
                            ))}
                            <InputGroup alignItems='center' pl={6} pr={2} gap={2} py={2}>
                                <Input
                                    ref={inputRef}
                                    value={customItem}
                                    onChange={(e) => setCustomItem(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder='Другой элемент'
                                    color='lime.800'
                                    _placeholder={{ color: 'lime.800' }}
                                    data-test-id={DATA_TEST_ID.ADD_OTHER_ALLERGEN}
                                />
                                <IconButton
                                    icon={<AddIcon h='7px' w='7px' />}
                                    onClick={handleAddCustom}
                                    aria-label='add item'
                                    isRound
                                    color='white'
                                    bg='lime.600'
                                    sx={{
                                        width: '14px',
                                        height: '14px',
                                        minWidth: '14px',
                                    }}
                                    data-test-id={DATA_TEST_ID.ADD_ALLERGEN_BUTTON}
                                />
                            </InputGroup>
                        </MenuOptionGroup>
                    </MenuList>
                )}
            </Menu>
        </Box>
    );
};
