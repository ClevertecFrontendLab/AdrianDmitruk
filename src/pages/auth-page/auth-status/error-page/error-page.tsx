import { AuthWrap } from '@components/ui';
import { FC, useEffect } from 'react';

import { useAuth } from '@hooks/use-auth';
import { store } from '@redux/configure-store';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { push } from 'redux-first-history';
import { DASHBOARD_PAGES } from '../../../../config';
import './error-page.scss';

export const ErrorPage: FC = () => {
    const navigate = useNavigate();

    const {
        clearErrorAuth,
        location,
        getRegister,
        email,
        password,
        getCheckEmail,
        getChangePassword,
    } = useAuth();

    useEffect(() => {
        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.ERROR_LOGIN
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }

        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.ERROR_USER_EXIST
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }

        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.ERROR
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }

        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname ===
                DASHBOARD_PAGES.ERROR_CHECK_EMAIL_NO_EXIST
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }

        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.ERROR_CHECK_EMAIL
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }

        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.ERROR_CHANGE_PASSWORD
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }
    }, [navigate]);

    console.log(store.getState().router.location?.pathname === DASHBOARD_PAGES.ERROR_LOGIN);
    return (
        <>
            {location.pathname === DASHBOARD_PAGES.ERROR_LOGIN && (
                <AuthWrap cn='error-page'>
                    <Result
                        status='warning'
                        title='Вход не выполнен'
                        subTitle='Что-то пошло не так. Попробуйте еще раз'
                        extra={
                            <Button
                                data-test-id='login-retry-button'
                                className='error-button'
                                type='primary'
                                key='console'
                                onClick={() => {
                                    clearErrorAuth();
                                    navigate(DASHBOARD_PAGES.LOGIN);
                                }}
                            >
                                Повторить
                            </Button>
                        }
                    />
                </AuthWrap>
            )}

            {location.pathname === DASHBOARD_PAGES.ERROR_USER_EXIST && (
                <AuthWrap cn='error-page'>
                    <Result
                        status='error'
                        title='Данные не сохранились'
                        subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                        extra={
                            <Button
                                data-test-id='registration-back-button'
                                className='error-button'
                                type='primary'
                                key='console'
                                onClick={() => {
                                    clearErrorAuth();
                                    navigate(DASHBOARD_PAGES.REGISTRATION);
                                }}
                            >
                                Повторить
                            </Button>
                        }
                    />
                </AuthWrap>
            )}

            {location.pathname === DASHBOARD_PAGES.ERROR && (
                <AuthWrap cn='error-page'>
                    <Result
                        status='error'
                        title='Данные не сохранились'
                        subTitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
                        extra={
                            <Button
                                data-test-id='registration-retry-button'
                                className='error-button'
                                type='primary'
                                key='console'
                                onClick={() => {
                                    clearErrorAuth();
                                    navigate(DASHBOARD_PAGES.REGISTRATION);
                                    getRegister({ email, password });
                                }}
                            >
                                Повторить
                            </Button>
                        }
                    />
                </AuthWrap>
            )}

            {location.pathname === DASHBOARD_PAGES.ERROR_CHECK_EMAIL_NO_EXIST && (
                <AuthWrap cn='error-page'>
                    <Result
                        status='error'
                        title='Такой e-mail не зарегистрирован'
                        subTitle={
                            <p className='error-subtitle'>
                                Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.
                            </p>
                        }
                        style={{ maxWidth: '100%' }}
                        extra={
                            <div>
                                <Button
                                    data-test-id='check-retry-button'
                                    className='error-button error-button__check-email'
                                    type='primary'
                                    key='console'
                                    onClick={() => {
                                        clearErrorAuth();
                                        navigate(DASHBOARD_PAGES.LOGIN);
                                    }}
                                >
                                    Повторить снова
                                </Button>
                            </div>
                        }
                    />
                </AuthWrap>
            )}

            {location.pathname === DASHBOARD_PAGES.ERROR_CHECK_EMAIL && (
                <AuthWrap cn='error-page'>
                    <Result
                        status='500'
                        title='Что-то пошло не так'
                        subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                        extra={
                            <Button
                                data-test-id='check-back-button'
                                className='error-button'
                                type='primary'
                                key='console'
                                onClick={() => {
                                    clearErrorAuth();
                                    navigate(DASHBOARD_PAGES.LOGIN);
                                    getCheckEmail({ email, password });
                                }}
                            >
                                Повторить снова
                            </Button>
                        }
                    />
                </AuthWrap>
            )}
            {location.pathname === DASHBOARD_PAGES.ERROR_CHANGE_PASSWORD && (
                <AuthWrap cn='error-page'>
                    <Result
                        status='error'
                        title='Данные не сохранились'
                        subTitle='Что-то пошло не так. Попробуйте ещё раз'
                        extra={
                            <Button
                                data-test-id='change-retry-button'
                                className='error-button'
                                type='primary'
                                key='console'
                                onClick={() => {
                                    clearErrorAuth();
                                    navigate(DASHBOARD_PAGES.CHANGE_PASSWORD);
                                    getChangePassword({ password, confirmPassword: password });
                                }}
                            >
                                Повторить
                            </Button>
                        }
                    />
                </AuthWrap>
            )}
        </>
    );
};
