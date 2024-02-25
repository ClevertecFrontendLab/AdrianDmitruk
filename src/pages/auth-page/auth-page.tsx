import { Tabs } from 'antd';
import { FC } from 'react';
import logo from '../../assets/auth-logo.png';

import { Auth } from '@components/auth';
import { AuthWrap } from '@components/ui';
import { store } from '@redux/configure-store';
import { Link, useNavigate } from 'react-router-dom';
import { DASHBOARD_PAGES } from '../../config/pages-url';
import './auth-page.scss';

export const AuthPage: FC = () => {
    const location = store.getState().router.location?.pathname;
    const navigate = useNavigate();
    const handleTabChange = (key: string) => {
        switch (key) {
            case '1':
                navigate(DASHBOARD_PAGES.LOGIN);
                break;
            case '2':
                navigate(DASHBOARD_PAGES.REGISTRATION);
                break;
            default:
                break;
        }
    };

    return (
        <AuthWrap cn='auth-page'>
            <img className='auth-page__logo' src={logo} alt='logo' />
            <Tabs
                defaultActiveKey={location === DASHBOARD_PAGES.LOGIN ? '1' : '2'}
                className='auth-page__content'
                onChange={handleTabChange}
                items={[
                    {
                        label: (
                            <Link onClick={() => handleTabChange('1')} to={DASHBOARD_PAGES.LOGIN}>
                                <span>Вход</span>
                            </Link>
                        ),
                        key: '1',
                        children: <Auth type='login' />,
                    },
                    {
                        label: (
                            <Link
                                onClick={() => handleTabChange('2')}
                                to={DASHBOARD_PAGES.REGISTRATION}
                            >
                                <span>Регистрация</span>
                            </Link>
                        ),
                        key: '2',
                        children: <Auth type='register' />,
                    },
                ]}
            ></Tabs>
        </AuthWrap>
    );
};
