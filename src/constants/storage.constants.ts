export enum LocalStorageKey {
    accessToken = 'accessToken',
}

export const DEFAULT_STORAGE_CONFIG: StorageConfig = {
    accessToken: null,
};

type StorageConfig = {
    accessToken: string | null;
};
