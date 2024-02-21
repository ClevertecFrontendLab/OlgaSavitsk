import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
    _api: AxiosInstance;

    constructor(axiosConfig: AxiosRequestConfig) {
        this._api = axios.create(axiosConfig);
        this._api.interceptors.response.use(
            (response: AxiosResponse) => response.data,
            // (error) => {
            //     if (axios.isAxiosError(error) && error.response) {
            //         const { status, statusText } = error.response || error.code;
            //         throw new Error(statusText);
            //     }
            //     return Promise.reject(error);
            // },
        );
    }

    get(url: string, params: unknown = {}, requestConfig: AxiosRequestConfig): Promise<void> {
        return this._api({
            method: 'get',
            url,
            params,
            ...requestConfig,
        });
    }

    post(url: string, data: unknown = {}, requestConfig?: AxiosRequestConfig): Promise<void> {
        return this._api({
            method: 'post',
            url,
            data,
            ...requestConfig,
        });
    }
}

const apiClient = new ApiClient({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    responseType: 'json',
});

export default apiClient;
