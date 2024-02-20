export interface AuthResponse {
    accessToken: string | null;
}

export interface ErrorPayload {
    statusCode: number;
    error: string;
    message: string;
    name?: string;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export interface AuthSliceState extends IAuthData {
    data: AuthResponse;
    status: Status;
    error: ErrorPayload | null;
    responseCode: number;
    responseName?: string;
    codeReset: string;
}

export interface IAuthData {
    email: string;
    password: string;
    remember?: boolean;
}

export interface IConfirmData {
    email: string;
    code: string;
}

export interface IChangePasswordData {
    password: string;
    confirmPassword: string;
}
