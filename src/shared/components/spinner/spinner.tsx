import { Center, Spinner } from '@chakra-ui/react';
import { FC } from 'react';

import { GRADIENT_STYLES } from '~/constants/menu.constants';

type SpinnerProps = {
    isLoading: boolean;
    size?: number;
    dataTestId?: string;
    fixed?: boolean;
};

export const SpinnerComponent: FC<SpinnerProps> = ({
    isLoading,
    size = 206,
    dataTestId,
    fixed = true,
}) => {
    if (!isLoading) return null;

    const fixedStyles = fixed
        ? {
              position: 'fixed' as const,
              top: 0,
              left: 0,
              w: '100vw',
              h: '100vh',
              bg: 'blackAlpha.300',
              backdropFilter: 'blur(2px)',
              zIndex: 10,
          }
        : {};

    return (
        <Center {...fixedStyles} data-test-id={dataTestId}>
            <Center w={size} h={size} {...GRADIENT_STYLES}>
                <Spinner />
            </Center>
        </Center>
    );
};
