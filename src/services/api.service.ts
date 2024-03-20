import { DEFAULT_STORAGE_CONFIG, LocalStorageKey } from '@constants/index';
import { getStorageValue } from '@hooks/index';
import { store } from '@redux/configure-store';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

const createHeaderConfig = (config: InternalAxiosRequestConfig) => {
    const { access_token } = getStorageValue(LocalStorageKey.authToken, DEFAULT_STORAGE_CONFIG);
    const currentToken = store.getState().authStore.token;
    const token = currentToken || access_token;
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

class ApiClient {
    _api: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this._api = axios.create(axiosConfig);
        this._api.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => createHeaderConfig(config),
            (error: AxiosError): Promise<AxiosError> => {
                return Promise.reject(error);
            },
        );
        this._api.interceptors.response.use((response: AxiosResponse) => response);
    }

    get<T>(url: string, params: unknown = {}): Promise<T> {
        return this._api({
            method: 'get',
            url,
            params,
        });
    }

    post(url: string, data: unknown = {}): Promise<void> {
        return this._api({
            method: 'post',
            url,
            data,
        });
    }

    put(url: string, data: unknown = {}): Promise<void> {
        return this._api({
            method: 'put',
            url,
            data,
        });
    }
}

const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    responseType: 'json',
});

export default apiClient;
