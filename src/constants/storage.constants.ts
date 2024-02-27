export enum LocalStorageKey {
  authToken = 'auth_token',
}

export const DEFAULT_STORAGE_CONFIG: StorageConfig = {
  access_token: '',
};

type StorageConfig = {
  access_token: string;
}
