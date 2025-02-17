export interface IAuthForm {
    email?: string;
    login: string;
    password: string;
    repeat_password?: string;
    apiError?: string;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
}
