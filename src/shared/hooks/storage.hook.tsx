import { Dispatch, SetStateAction, useState } from 'react';

type UseStorageType<T> = {
    state: T | null;
    setValue: Dispatch<SetStateAction<T | null>>;
    removeValue: () => void;
};

function getStorageValue<T>(key: string, initialValue: T | (() => T) | null): T | null {
    if (typeof window === 'undefined') {
        return initialValue instanceof Function ? initialValue() : initialValue;
    }

    try {
        const item = window.localStorage.getItem(key);
        return item
            ? JSON.parse(item)
            : initialValue instanceof Function
              ? initialValue()
              : initialValue;
    } catch (error) {
        console.error(error);
        return initialValue instanceof Function ? initialValue() : initialValue;
    }
}

export function useStorage<T>(key: string, initialValue: T | (() => T) | null): UseStorageType<T> {
    const [state, setState] = useState<T | null>(() => getStorageValue(key, initialValue));

    const setValue: Dispatch<SetStateAction<T | null>> = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            setState(valueToStore);

            if (typeof window !== 'undefined') {
                if (valueToStore === null) {
                    window.localStorage.removeItem(key);
                } else {
                    window.localStorage.setItem(key, JSON.stringify(valueToStore));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeValue = (): void => {
        try {
            setState(null);
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return { state, setValue, removeValue };
}
