import { axiosClassic } from "@/api/api.interceptors";
import { API_URL } from "@/config/api.config";
import {
    EnumTokens,
    removeFromStorage,
    saveTokenStorage,
} from "./auth-token.service";
import { IAuthForm, IAuthResponse } from "@/types/auth.interface";

class AuthService {
    async main(type: "login" | "registration" | "refpass", data: IAuthForm) {
        const response = await axiosClassic<IAuthResponse>({
            url: API_URL.auth(`/${type}`),
            method: "POST",
            data,
        });

        saveTokenStorage(
            EnumTokens.ACCESS_TOKEN,
            response.data?.accessToken,
            new Date().getTime() + 1 * 60 * 1000
        );
        saveTokenStorage(
            EnumTokens.REFRESH_TOKEN,
            response.data?.refreshToken
        );

        return response;
    }

    logout() {
        return removeFromStorage([
            EnumTokens.ACCESS_TOKEN,
            EnumTokens.REFRESH_TOKEN,
        ]);
    }
}

export const authService = new AuthService();
