import { HStack, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { CustomIcon } from '../custom-icon/custom-icon';

type IconCounterProps = {
    icon: string;
    count?: number;
    color?: string;
    boxSize?: string;
    fontSize?: string;
    fontWeight?: string;
};

export const IconCounter: FC<IconCounterProps> = ({ icon, count, boxSize, ...rest }) => (
    <HStack spacing={1}>
        <CustomIcon icon={icon} boxSize={boxSize} />
        <Text color='lime.600' fontWeight={600} {...rest}>
            {count}
        </Text>
    </HStack>
);
