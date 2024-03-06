import { RootState } from '@redux/configure-store';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const UseMemmoisedSelector = <T>(selector: (state: RootState) => T): T => {
    const result = useSelector(selector);
    return useMemo(() => result, [result]);
};
