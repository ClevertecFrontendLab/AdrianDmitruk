import { FC, useEffect } from 'react';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { AuthWrap } from '@components/ui';
import { useAuth } from '@hooks/use-auth';
import { store } from '@redux/configure-store';
import { useNavigate } from 'react-router-dom';
import { push } from 'redux-first-history';
import { DASHBOARD_PAGES } from '../../../config';
import './change-password-page.scss';

interface ChangePasswordValues {
    password: string;
    confirmPassword: string;
}

export const ChangePasswordPage: FC = () => {
    const [form] = Form.useForm<ChangePasswordValues>();

    const navigate = useNavigate();

    const { getChangePassword, errorAuth, repeatRegister, responseCode, email, responseName } =
        useAuth();

    const onFinish = (values: ChangePasswordValues) => {
        repeatRegister({ email, password: values.password });
        getChangePassword(values);
    };

    useEffect(() => {
        if (
            store.getState().router.action === 'POP' &&
            store.getState().router.location?.pathname === DASHBOARD_PAGES.CHANGE_PASSWORD
        ) {
            store.dispatch(push(DASHBOARD_PAGES.LOGIN));
            navigate(DASHBOARD_PAGES.LOGIN);
        }
    }, [navigate]);

    useEffect(() => {
        if (errorAuth?.name === 'changePasswordResponse') {
            store.dispatch(push(DASHBOARD_PAGES.ERROR_CHANGE_PASSWORD));
            navigate(DASHBOARD_PAGES.ERROR_CHANGE_PASSWORD);
        }

        if (responseCode === 201 && responseName === 'changePassword') {
            store.dispatch(push(DASHBOARD_PAGES.SUCCESS_CHANGE_PASSWORD));
            navigate(DASHBOARD_PAGES.SUCCESS_CHANGE_PASSWORD);
        }
    }, [errorAuth?.name, navigate, responseCode, responseName]);

    return (
        <AuthWrap cn='change-password'>
            <Form
                form={form}
                name='normal_login'
                className='login-form change-password__change'
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h3 className='change-password__title'>Восстановление аккауанта</h3>
                <Form.Item
                    name='password'
                    className='input-item'
                    help={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
                    rules={[
                        {
                            pattern: /^(?=.*\d)(?=.*[A-ZА-Я])(?=.*[a-zA-Zа-яА-Я]).{8,}$/,
                            message:
                                'Пароль должен быть не менее 8 символов, с заглавной буквой и цифрой',
                        },
                    ]}
                >
                    <Input.Password
                        data-test-id='change-password'
                        placeholder='Пароль'
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                        size='large'
                    />
                </Form.Item>

                <Form.Item
                    name='confirmPassword'
                    className='input-item'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        data-test-id='change-confirm-password'
                        placeholder='Повторите пароль'
                        size='large'
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: '0' }} shouldUpdate>
                    {() => (
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button login__btn'
                            data-test-id='change-submit-button'
                            disabled={
                                !form.isFieldsTouched(['password', 'confirm']) ||
                                !!form
                                    .getFieldsError(['password', 'confirm'])
                                    .filter(({ errors }) => errors.length).length
                            }
                        >
                            Сохранить
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </AuthWrap>
    );
};
