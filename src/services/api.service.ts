import { DEFAULT_STORAGE_CONFIG, LocalStorageKey } from '@constants/index';
import { getStorageValue } from '@hooks/index';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

const createHeaderConfig = (config: InternalAxiosRequestConfig) => {
    const token = getStorageValue(LocalStorageKey.authToken, DEFAULT_STORAGE_CONFIG);
    if (token.access_token) {
        config.headers['Authorization'] = `Bearer ${token.access_token}`;
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
        this._api.interceptors.response.use(
            (response: AxiosResponse) => response,
            // (error: AxiosError) => {
            //     if (axios.isCancel(error)) {
            //         throw error;
            //     }
            // },
        );
    }

    get(url: string, params: unknown = {}): Promise<void> {
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
}

const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    responseType: 'json',
});

export default apiClient;
