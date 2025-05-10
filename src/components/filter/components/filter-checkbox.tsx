import { Box, Checkbox, CheckboxGroup, FormLabel, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { Option } from '~/shared/types/filters';
import { isArrayWithItems } from '~/shared/utils/common';

import { sideDishOptions } from '../constants';

type CheckBoxProps = {
    title: string;
    selected: string[];
    options?: Option[];
    onChange: (values: string[]) => void;
};

export const FilterCheckboxGroup: FC<CheckBoxProps> = ({ title, options, selected, onChange }) => (
    <Box>
        <FormLabel fontWeight='medium'>{title}</FormLabel>
        <CheckboxGroup value={selected} onChange={(values: string[]) => onChange(values)}>
            <Stack spacing={2}>
                {isArrayWithItems(options) &&
                    options.map(({ label, value }) => (
                        <Checkbox
                            size='sm'
                            colorScheme='lime'
                            borderColor='lime.150'
                            key={value}
                            value={label}
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
                                label === sideDishOptions[0].label ? 'checkbox-картошка' : ''
                            }
                        >
                            {label}
                        </Checkbox>
                    ))}
            </Stack>
        </CheckboxGroup>
    </Box>
);
