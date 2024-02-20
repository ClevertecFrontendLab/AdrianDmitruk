/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthResponse, ErrorPayload, IAuthData, IChangePasswordData, IConfirmData } from './types';

import { axiosClassic } from '@api/interceptors';
import { setResponseAuth, setResponseNameAuth } from './slice';

export const getLoginFeatch = createAsyncThunk(
    'login/fetchLoginStatus',
    async (params: IAuthData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axiosClassic.post<AuthResponse>('/auth/login', params);
            dispatch(setResponseAuth(200));
            dispatch(setResponseNameAuth('login'));
            return data;
        } catch (error: any) {
            const errorResponse: ErrorPayload = {
                statusCode: error?.response?.status || 500,
                error: error?.response?.data?.error || 'Unknown Error',
                message: error?.response?.data?.message || 'An error occurred',
                name: 'loginResponse',
            };

            // dispatch(setErrorAuth(errorResponse));
            return rejectWithValue(errorResponse);
        }
    },
);

export const getRegistrationFeatch = createAsyncThunk(
    'registration/fetchRegistrationStatus',
    async (params: IAuthData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axiosClassic.post<AuthResponse>('/auth/registration', params);
            dispatch(setResponseAuth(201));
            dispatch(setResponseNameAuth('register'));
            return data;
        } catch (error: any) {
            const errorResponse: ErrorPayload = {
                statusCode: error?.response?.status,
                error: error?.response?.data?.error,
                message: error?.response?.data?.message,
                name: 'registerResponse',
            };
            // dispatch(setErrorAuth(errorResponse));

            return rejectWithValue(errorResponse);
        }
    },
);

export const checkEmailFeatch = createAsyncThunk(
    'checkemail/fetchCheckEmailStatus',
    async (params: IAuthData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axiosClassic.post<AuthResponse>('/auth/check-email', params);
            dispatch(setResponseAuth(200));
            dispatch(setResponseNameAuth('checkemail'));
            return data;
        } catch (error: any) {
            const errorResponse: ErrorPayload = {
                statusCode: error?.response?.status,
                error: error?.response?.data?.error,
                message: error?.response?.data?.message,
                name: 'checkEmailResponse',
            };
            // dispatch(setErrorAuth(errorResponse));

            return rejectWithValue(errorResponse);
        }
    },
);

export const confirmEmailFeatch = createAsyncThunk(
    'confirmemail/fetchConfirmEmailStatus',
    async (params: IConfirmData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axiosClassic.post<IConfirmData>('/auth/confirm-email', params);

            dispatch(setResponseAuth(200));
            dispatch(setResponseNameAuth('confirmEmail'));
            return data;
        } catch (error: any) {
            const errorResponse: ErrorPayload = {
                statusCode: error?.response?.status,
                error: error?.response?.data?.error,
                message: error?.response?.data?.message,
                name: 'confirmEmailResponse',
            };
            // dispatch(setErrorAuth(errorResponse));

            return rejectWithValue(errorResponse);
        }
    },
);

export const changePasswordFeatch = createAsyncThunk(
    'changepassword/fetchChangePasswordStatus',
    async (params: IChangePasswordData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await axiosClassic.post<IChangePasswordData>(
                '/auth/change-password',
                params,
            );
            dispatch(setResponseAuth(201));
            dispatch(setResponseNameAuth('changePassword'));
            return data;
        } catch (error: any) {
            const errorResponse: ErrorPayload = {
                statusCode: error?.response?.status,
                error: error?.response?.data?.error,
                message: error?.response?.data?.message,
                name: 'changePasswordResponse',
            };
            // dispatch(setErrorAuth(errorResponse));

            return rejectWithValue(errorResponse);
        }
    },
);
