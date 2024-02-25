import { AuthWrap } from '@components/ui';
import { Result } from 'antd';
import { FC, useEffect, useState } from 'react';

import { Typography } from 'antd';

import { useAuth } from '@hooks/use-auth';
import { store } from '@redux/configure-store';
import { useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';
import { push } from 'redux-first-history';
import { DASHBOARD_PAGES } from '../../../config';
import './confirm-email-page.scss';

const { Text } = Typography;

export const ConfirmEmailPage: FC = () => {
    const { email, getConfirmEmail, errorAuth, responseCode, responseName } = useAuth();

    const [isError, setIsError] = useState<boolean>(false);

    const [verificationCode, setVerificationCode] = useState<string>('');

    const navigate = useNavigate();

    const handleVerificationCodeChange = (code: string) => {
        setIsError(false);
        setVerificationCode(code);
        if (code.length === 6) {
            getConfirmEmail({ code, email });
        }
    };

    useEffect(() => {
        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.CONFIRM_EMAIL
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }
    }, [navigate]);

    useEffect(() => {
        if (errorAuth?.name === 'confirmEmailResponse') {
            setIsError(true);
            setVerificationCode('');
        }

        if (responseCode === 200 && responseName === 'confirmEmail') {
            store.dispatch(push(DASHBOARD_PAGES.CHANGE_PASSWORD));
            navigate(DASHBOARD_PAGES.CHANGE_PASSWORD);
        }
    }, [errorAuth?.name, navigate, responseCode, responseName]);

    useEffect(() => {
        setVerificationCode('');
    }, [email]);

    return (
        <>
            <AuthWrap cn='confirm-email'>
                <Result
                    status={isError ? 'error' : undefined}
                    title={
                        isError
                            ? 'Неверный код. Введите код для восстановления аккаунта'
                            : 'Введите код для восстановления аккаунта'
                    }
                    subTitle={`Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`}
                    style={{ maxWidth: '100%' }}
                    extra={
                        <div data-test-id='verification-input'>
                            <VerificationInput
                                placeholder=''
                                classNames={{
                                    container: 'container',
                                    character: isError ? 'character__error' : 'character',
                                    characterInactive: 'character--inactive',
                                    characterSelected: 'character--selected',
                                    characterFilled: 'character--filled',
                                }}
                                onChange={handleVerificationCodeChange}
                                value={verificationCode}
                                length={6}
                            />
                        </div>
                    }
                />
                <div className='confirm-email__info'>
                    <Text type='secondary'>Не пришло письмо? Проверьте папку Спам.</Text>
                </div>
            </AuthWrap>
        </>
    );
};
