import {
    changePasswordFeatch,
    checkEmailFeatch,
    confirmEmailFeatch,
    getLoginFeatch,
    getRegistrationFeatch,
} from '@redux/auth/async-actions';
import { selectAuthData } from '@redux/auth/selectors';
import { logout, setDataAuth, setErrorAuth, setResponseAuth } from '@redux/auth/slice';
import { IAuthData, IChangePasswordData, IConfirmData } from '@redux/auth/types';
import { history } from '@redux/configure-store';
import { removeFromLocalStorage } from '@services/auth-token-service';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './typed-react-redux-hooks';

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const location = history.location;

    const {
        email,
        password,
        status: statusAuth,
        error: errorAuth,
        responseCode,
        data: dataAuth,
        responseName,
    } = useSelector(selectAuthData);

    const getLogin = useCallback(
        (params: IAuthData) => {
            dispatch(getLoginFeatch(params));
        },
        [dispatch],
    );

    const getRegister = useCallback(
        (params: IAuthData) => {
            dispatch(getRegistrationFeatch(params));
        },
        [dispatch],
    );

    const repeatRegister = useCallback(
        (params: IAuthData) => {
            dispatch(setDataAuth(params));
        },
        [dispatch],
    );

    const clearErrorAuth = useCallback(() => {
        dispatch(setErrorAuth(null));
    }, [dispatch]);

    const clearResponseCode = useCallback(() => {
        dispatch(setResponseAuth(0));
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        removeFromLocalStorage();
    };

    const getCheckEmail = useCallback(
        (params: IAuthData) => {
            dispatch(checkEmailFeatch(params));
        },
        [dispatch],
    );

    const getConfirmEmail = useCallback(
        (params: IConfirmData) => {
            dispatch(confirmEmailFeatch(params));
        },
        [dispatch],
    );

    const getChangePassword = useCallback(
        (params: IChangePasswordData) => {
            dispatch(changePasswordFeatch(params));
        },
        [dispatch],
    );

    return {
        getLogin,
        getRegister,
        email,
        password,
        statusAuth,
        errorAuth,
        clearErrorAuth,
        location,
        repeatRegister,
        responseCode,
        clearResponseCode,
        dataAuth,
        handleLogout,
        getCheckEmail,
        getConfirmEmail,
        getChangePassword,
        responseName,
    };
};
