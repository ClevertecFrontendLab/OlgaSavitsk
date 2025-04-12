import { Image } from '@chakra-ui/react';
import { FC } from 'react';

type CustomIconProps = {
    icon: string;
    boxSize?: string | number | { [key: string]: string | number };
};

export const CustomIcon: FC<CustomIconProps> = ({ icon, boxSize = '12px', ...rest }) => (
    <Image src={icon} boxSize={boxSize} {...rest} />
);
