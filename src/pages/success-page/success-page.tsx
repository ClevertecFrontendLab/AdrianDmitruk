import { FC, useEffect } from 'react';

import { AuthWrap } from '@components/ui';
import { useAuth } from '@hooks/use-auth';
import { store } from '@redux/configure-store';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { push } from 'redux-first-history';
import { DASHBOARD_PAGES } from '../../config';
import './success-page.scss';

export const SuccessPage: FC = () => {
    const navigate = useNavigate();

    const { clearResponseCode, location } = useAuth();

    useEffect(() => {
        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.SUCCESS
        ) {
            store.dispatch(push(DASHBOARD_PAGES.REGISTRATION));
            navigate(DASHBOARD_PAGES.REGISTRATION);
        }

        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.SUCCESS_CHANGE_PASSWORD
        ) {
            store.dispatch(push(DASHBOARD_PAGES.REGISTRATION));
            navigate(DASHBOARD_PAGES.LOGIN);
        }
    }, [navigate]);

    return (
        <>
            {location.pathname === DASHBOARD_PAGES.SUCCESS && (
                <AuthWrap cn='success-page'>
                    <Result
                        status='success'
                        title='Регистрация успешна'
                        subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
                        extra={
                            <Button
                                data-test-id='registration-enter-button'
                                className='success-button'
                                type='primary'
                                key='console'
                                onClick={() => {
                                    clearResponseCode();
                                    navigate(DASHBOARD_PAGES.LOGIN);
                                }}
                            >
                                Войти
                            </Button>
                        }
                    />
                </AuthWrap>
            )}
            {location.pathname === DASHBOARD_PAGES.SUCCESS_CHANGE_PASSWORD && (
                <AuthWrap cn='success-page'>
                    <Result
                        status='success'
                        title='Пароль успешно изменен'
                        subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
                        extra={
                            <Button
                                data-test-id='change-entry-button'
                                className='success-button'
                                type='primary'
                                key='console'
                                onClick={() => {
                                    clearResponseCode();
                                    navigate(DASHBOARD_PAGES.LOGIN);
                                }}
                            >
                                Вход
                            </Button>
                        }
                    />
                </AuthWrap>
            )}
        </>
    );
};
