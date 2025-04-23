import { SearchIcon } from '@chakra-ui/icons';
import {
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    Switch,
} from '@chakra-ui/react';

import filterIcon from '~/assets/icons/filter.svg';
import { CustomIcon } from '~/shared/components/custom-icon/custom-icon';

export const Filter = () => (
    <Stack
        spacing={4}
        pt={{ base: 4, lg: 8 }}
        maxW={{ sm: '100%', md: 448, lg: 'full' }}
        w='full'
        mx='auto'
    >
        <HStack spacing={3}>
            <IconButton
                aria-label='Sort'
                variant='outline'
                borderColor='blackAlpha.600'
                size={{ base: 'sm', lg: 'lg', '2xl': 'lg' }}
                p={{ base: 0, md: 0 }}
                icon={<CustomIcon icon={filterIcon} boxSize={{ base: 4, lg: 6 }} />}
            />

            <InputGroup pointerEvents='none' size={{ base: 'sm', lg: 'lg', '2xl': 'lg' }}>
                <Input
                    placeholder='Название или ингредиент...'
                    borderColor='blackAlpha.600'
                    borderRadius={6}
                    _placeholder={{ color: 'lime.800' }}
                />
                <InputRightElement>
                    <Icon as={SearchIcon} color='gray.400' />
                </InputRightElement>
            </InputGroup>
        </HStack>

        <HStack spacing={4} display={{ base: 'none', lg: 'flex' }}>
            <HStack>
                <FormLabel htmlFor='allergens' whiteSpace='nowrap' mb={0}>
                    Исключить мои аллергены
                </FormLabel>
                <Switch id='allergens' />
            </HStack>
            <Select placeholder='Выберите из списка...' _placeholder={{ color: 'blackAlpha.700' }}>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
            </Select>
        </HStack>
    </Stack>
);
