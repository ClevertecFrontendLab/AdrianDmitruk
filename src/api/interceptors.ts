import { getTokenFromLocalStorage } from '@services/auth-token-service';
import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
    baseURL: 'https://marathon-api.clevertec.ru',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
    const accessToken = getTokenFromLocalStorage();

    if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

export { axiosClassic, axiosWithAuth };
