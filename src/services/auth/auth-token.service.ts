import Cookies from "js-cookie";
import IUser from "@/types/User";
import { jwtDecode } from "jwt-decode";

export enum EnumTokens {
    ACCESS_TOKEN = "access_token",
    REFRESH_TOKEN = "refresh_token",
}

export const getUserData = (access_token: string | undefined) => {
    if (access_token) {
        try {
            const data = <IUser>jwtDecode(access_token);
            return data;
        } catch {
            return null;
        }
    }
    return null;
};

export const getAccessToken = () => {
    const access_token = Cookies.get(EnumTokens.ACCESS_TOKEN);
    return access_token || null;
};

export const getRefreshToken = () => {
    const refresh_token = Cookies.get(EnumTokens.REFRESH_TOKEN);
    return refresh_token || null;
};

export const saveTokenStorage = (
    nameToken: EnumTokens,
    value: string,
    expires: number | Date = 1
) => {
    Cookies.set(nameToken, value, {
        domain: process.env.APP_DOMAIN,
        sameSite: "strict",
        expires: expires,
    });
};
export const removeFromStorage = (namesToken: EnumTokens[]) => {
    namesToken.forEach((value) => Cookies.remove(value));
};
