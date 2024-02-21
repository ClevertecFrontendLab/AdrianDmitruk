import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import {
    addToLocalStorage,
    addToSessionStorage,
    getTokenFromLocalStorage,
} from '@services/auth-token-service';
import {
    changePasswordFeatch,
    checkEmailFeatch,
    confirmEmailFeatch,
    getLoginFeatch,
    getRegistrationFeatch,
} from './async-actions';
import {
    AuthResponse,
    AuthSliceState,
    ErrorPayload,
    IAuthData,
    IConfirmData,
    Status,
} from './types';

const initialState: AuthSliceState = {
    data: {
        accessToken: getTokenFromLocalStorage() || null,
    },
    email: '',
    password: '',
    remember: true,
    status: Status.SUCCESS,
    error: null,
    responseCode: 0,
    responseName: '',
    codeReset: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setDataAuth(state, action: PayloadAction<IAuthData>) {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.remember = action.payload.remember;
        },

        setErrorAuth(state, action: PayloadAction<ErrorPayload | null>) {
            state.error = action.payload;
        },

        setResponseAuth(state, action: PayloadAction<number>) {
            state.responseCode = action.payload;
        },
        setResponseNameAuth(state, action: PayloadAction<string>) {
            state.responseName = action.payload;
        },

        logout(state) {
            state.data.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            getLoginFeatch.fulfilled,
            (state, { payload }: PayloadAction<AuthResponse>) => {
                state.data = payload;
                state.status = Status.SUCCESS;
                if (state.remember) {
                    payload.accessToken && addToLocalStorage(payload.accessToken);
                } else {
                    payload.accessToken && addToSessionStorage(payload.accessToken);
                }
            },
        );

        builder.addCase(getRegistrationFeatch.fulfilled, (state) => {
            state.status = Status.SUCCESS;
        });

        builder.addCase(checkEmailFeatch.fulfilled, (state) => {
            state.status = Status.SUCCESS;
            state.responseCode = 0;
        });

        builder.addCase(
            confirmEmailFeatch.fulfilled,
            (state, { payload }: PayloadAction<IConfirmData>) => {
                state.codeReset = payload.code;
                state.email = payload.email;
                state.status = Status.SUCCESS;
                state.responseCode = 0;
            },
        );

        builder.addCase(changePasswordFeatch.fulfilled, (state) => {
            state.status = Status.SUCCESS;
        });

        builder.addMatcher(
            isAnyOf(
                getLoginFeatch.pending,
                getRegistrationFeatch.pending,
                checkEmailFeatch.pending,
                confirmEmailFeatch.pending,
                changePasswordFeatch.pending,
            ),
            (state) => {
                state.status = Status.LOADING;
            },
        );
        builder.addMatcher(
            isAnyOf(
                getLoginFeatch.rejected,
                getRegistrationFeatch.rejected,
                checkEmailFeatch.rejected,
                confirmEmailFeatch.rejected,
                changePasswordFeatch.rejected,
            ),
            (state, action) => {
                state.status = Status.ERROR;
                state.error = action.payload as ErrorPayload;
            },
        );
    },
});

export const { setDataAuth, setErrorAuth, setResponseAuth, setResponseNameAuth, logout } =
    authSlice.actions;

export default authSlice.reducer;
