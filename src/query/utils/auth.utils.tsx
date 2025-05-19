import { DEFAULT_STORAGE_CONFIG, LocalStorageKey } from '~/constants/storage.constants';
import { useStorage } from '~/shared/hooks/storage.hook';

export const HandleAuthToken = (token: string | null) => {
    const { setValue, removeValue } = useStorage<string>(
        LocalStorageKey.accessToken,
        DEFAULT_STORAGE_CONFIG.accessToken,
    );

    if (token) {
        setValue(token);
    } else {
        removeValue();
    }
};
