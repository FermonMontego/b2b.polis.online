import { useMemo } from 'react';
import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';

export const useAxiosInstance = (
    config?: CreateAxiosDefaults,
): AxiosInstance => {
    return useMemo(() => {
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:80/api',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Accept: 'application/json',
            },
            ...config,
        });

        axiosInstance.interceptors.request.use((cfg) => {
            return cfg;
        });

        return axiosInstance;
    }, [config]);
};
