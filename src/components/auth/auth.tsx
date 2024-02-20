import { FC, useEffect, useState } from 'react';

import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import { useAuth } from '@hooks/use-auth';
import { Status } from '@redux/auth/types';
import { store } from '@redux/configure-store';
import { useNavigate } from 'react-router-dom';
import { push } from 'redux-first-history';
import { DASHBOARD_PAGES } from '../../config';
import './auth.scss';

interface FormValues {
    email: string;
    password: string;
    remember: boolean;
}

interface IAuthProps {
    type: AuthType;
}

type AuthType = 'login' | 'register';

export const Auth: FC<IAuthProps> = ({ type }) => {
    const [form] = Form.useForm<FormValues>();

    const navigate = useNavigate();

    const {
        getLogin,
        getRegister,
        errorAuth,
        repeatRegister,
        responseCode,
        responseName,
        getCheckEmail,

        statusAuth,
    } = useAuth();

    const [emailValidationStatus, setEmailValidationStatus] = useState<boolean>(false);

    console.log(emailValidationStatus);

    const onFinish = (values: FormValues) => {
        repeatRegister(values);
        const params = {
            email: values.email,
            password: values.password,
        };
        type === 'login' && getLogin(params);
        type === 'register' && getRegister(values);
    };

    useEffect(() => {
        if (errorAuth?.name === 'loginResponse' && type === 'login') {
            store.dispatch(push(DASHBOARD_PAGES.ERROR_LOGIN));
            navigate(DASHBOARD_PAGES.ERROR_LOGIN);
        }

        if (responseName === 'login' && responseCode === 200 && type === 'login') {
            store.dispatch(push(DASHBOARD_PAGES.HOME));
            navigate(DASHBOARD_PAGES.HOME);
        }
    }, [errorAuth?.name, navigate, responseCode, responseName, type]);

    useEffect(() => {
        if (
            responseName === 'register' &&
            responseCode === 201 &&
            type === 'register' &&
            statusAuth === Status.SUCCESS
        ) {
            store.dispatch(push(DASHBOARD_PAGES.SUCCESS));
            navigate(DASHBOARD_PAGES.SUCCESS);
        }

        if (
            errorAuth?.name === 'registerResponse' &&
            errorAuth.statusCode === 409 &&
            type === 'register'
        ) {
            store.dispatch(push(DASHBOARD_PAGES.ERROR_USER_EXIST));
            navigate(DASHBOARD_PAGES.ERROR_USER_EXIST);
        }

        if (
            errorAuth?.name === 'registerResponse' &&
            errorAuth.statusCode !== 409 &&
            type === 'register'
        ) {
            store.dispatch(push(DASHBOARD_PAGES.ERROR));
            navigate(DASHBOARD_PAGES.ERROR);
        }
    }, [errorAuth, navigate, responseCode, responseName, statusAuth, type]);

    useEffect(() => {
        if (
            errorAuth?.name === 'checkEmailResponse' &&
            errorAuth.statusCode === 404 &&
            errorAuth.message === 'Email не найден' &&
            type === 'login'
        ) {
            store.dispatch(push(DASHBOARD_PAGES.ERROR_CHECK_EMAIL_NO_EXIST));
            navigate(DASHBOARD_PAGES.ERROR_CHECK_EMAIL_NO_EXIST);
        }

        if (
            errorAuth?.name === 'checkEmailResponse' &&
            errorAuth.statusCode &&
            errorAuth.message !== 'Email не найден' &&
            type === 'login'
        ) {
            store.dispatch(push(DASHBOARD_PAGES.ERROR_CHECK_EMAIL));
            navigate(DASHBOARD_PAGES.ERROR_CHECK_EMAIL);
        }

        if (responseName === 'checkemail' && responseCode === 200 && type === 'login') {
            store.dispatch(push(DASHBOARD_PAGES.CONFIRM_EMAIL));
            navigate(DASHBOARD_PAGES.CONFIRM_EMAIL);
        }
    }, [
        errorAuth?.message,
        errorAuth?.name,
        errorAuth?.statusCode,
        navigate,
        responseCode,
        responseName,
        type,
    ]);

    const handleForgPass = () => {
        if (emailValidationStatus) {
            const values = form.getFieldsValue();
            repeatRegister(values);
            getCheckEmail(values);
        }
    };

    return (
        <Form
            form={form}
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name='email'
                rules={[
                    { required: true, message: 'Please input your email!' },
                    {
                        type: 'email',
                        message: 'Please enter a valid email address!',
                        validator: (_, value) => {
                            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                            const isValidEmail = emailPattern.test(value);

                            setEmailValidationStatus(isValidEmail);

                            if (isValidEmail) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(
                                    new Error('Please enter a valid email address!'),
                                );
                            }
                        },
                    },
                ]}
                className='input-item'
            >
                <Input
                    data-test-id={type === 'login' ? 'login-email' : 'registration-email'}
                    addonBefore='e-mail:'
                    size='large'
                />
            </Form.Item>

            {type === 'register' ? (
                <Form.Item
                    name='password'
                    className='input-item'
                    help={
                        type === 'register' &&
                        'Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    }
                    rules={[
                        {
                            pattern: /^(?=.*\d)(?=.*[A-ZА-Я])(?=.*[a-zA-Zа-яА-Я]).{8,}$/,
                            message:
                                'Пароль должен быть не менее 8 символов, с заглавной буквой и цифрой',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Пароль'
                        data-test-id='registration-password'
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        size='large'
                    />
                </Form.Item>
            ) : (
                <Form.Item
                    name='password'
                    className='input-item'
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле!',
                            pattern: /^(?=.*\d)(?=.*[A-ZА-Я])(?=.*[a-zA-Zа-яА-Я]).{8,}$/,
                        },
                    ]}
                >
                    <Input.Password
                        data-test-id='login-password'
                        placeholder='Пароль'
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        size='large'
                    />
                </Form.Item>
            )}

            {type === 'register' && (
                <Form.Item
                    name='confirm'
                    data-test-id='registration-confirm-password'
                    className='input-item'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The two passwords that you entered do not match!'),
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='Повторите пароль' size='large' />
                </Form.Item>
            )}

            {type === 'login' && (
                <div className='input-auth__check-wrap'>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox data-test-id='login-remember' defaultChecked={false}>
                            Запомнить меня
                        </Checkbox>
                    </Form.Item>
                    <Button
                        className='input-auth__button-pass'
                        type='text'
                        htmlType='submit'
                        onClick={handleForgPass}
                        data-test-id='login-forgot-button'
                    >
                        Забыли пароль?
                    </Button>
                </div>
            )}

            <Form.Item style={{ marginBottom: '0' }} shouldUpdate>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button login__btn'
                        data-test-id={
                            type === 'login' ? 'login-submit-button' : 'registration-submit-button'
                        }
                        // disabled={
                        //     !form.isFieldsTouched(['email', 'password', 'confirm']) ||
                        //     !!form
                        //         .getFieldsError(['email', 'password', 'confirm'])
                        //         .filter(({ errors }) => errors.length).length
                        // }
                    >
                        Войти
                    </Button>
                )}
            </Form.Item>
            <Button className='login-form-button google-btn' icon={<GooglePlusOutlined />}>
                Войти через Google
            </Button>
        </Form>
    );
};
