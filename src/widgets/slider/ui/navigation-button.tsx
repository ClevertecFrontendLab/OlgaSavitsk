import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

type NavigationButtonProps = IconButtonProps & {
    direction: 'prev' | 'next';
};

export const NavigationButton: FC<NavigationButtonProps> = ({ direction, ...props }) => (
    <IconButton
        position='absolute'
        zIndex={10}
        bg='black'
        size='lg'
        transform='translateY(-50%)'
        icon={
            direction === 'prev' ? (
                <ArrowBackIcon color='lime.50' />
            ) : (
                <ArrowForwardIcon color='lime.50' />
            )
        }
        className={`custom-swiper-button-${direction}`}
        {...props}
    />
);
