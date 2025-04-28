import { HStack, Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';

import { CustomIcon } from '../custom-icon/custom-icon';

type StatBadgeProps = {
    icon: string;
    count?: number;
    color?: string;
    boxSize?: number | string;
    fontSize?: string | TextProps['fontSize'];
    fontWeight?: string;
    py?: number | string;
    px?: number | string;
};

export const StatBadge: FC<StatBadgeProps> = ({ icon, count, boxSize, py, px, ...rest }) => (
    <HStack spacing={1} py={py} px={px}>
        <CustomIcon icon={icon} boxSize={boxSize} />
        <Text color='lime.600' fontWeight={600} {...rest}>
            {count}
        </Text>
    </HStack>
);
