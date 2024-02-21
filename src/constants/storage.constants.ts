export enum LocalStorageKey {
  authToken = 'auth_token',
}

export const DEFAULT_STORAGE_CONFIG: StorageConfig = {
  access_token: '',
};

interface StorageConfig {
  access_token: string;
}
