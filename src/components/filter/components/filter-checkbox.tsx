import { Box, Checkbox, CheckboxGroup, FormLabel, Stack } from '@chakra-ui/react';
import { FC } from 'react';

type CheckBoxProps = {
    title: string;
    options: string[];
    selected: string[];
    onChange: (values: string[]) => void;
};

export const FilterCheckboxGroup: FC<CheckBoxProps> = ({ title, options, selected, onChange }) => (
    <Box>
        <FormLabel fontWeight='medium'>{title}</FormLabel>
        <CheckboxGroup value={selected} onChange={(values: string[]) => onChange(values)}>
            <Stack spacing={2}>
                {options.map((option) => (
                    <Checkbox
                        size='sm'
                        colorScheme='lime'
                        borderColor='lime.150'
                        key={option}
                        value={option}
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
                        data-test-id={option === 'Картошка' ? 'checkbox-картошка' : ''}
                    >
                        {option}
                    </Checkbox>
                ))}
            </Stack>
        </CheckboxGroup>
    </Box>
);
