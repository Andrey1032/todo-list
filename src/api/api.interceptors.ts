import { getContentType } from "./api.helper";
import { SERVER_URL } from "@/config/api.config";
import { getAccessToken } from "@/services/auth/auth-token.service";
import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
    baseURL: SERVER_URL,
    headers: getContentType(),
    withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

axiosWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        if (error?.response?.status === 401) {
        }

        throw error;
    }
);

export { axiosClassic, axiosWithAuth };
