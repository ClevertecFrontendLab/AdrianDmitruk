import { FC } from 'react';

import { Outlet } from 'react-router-dom';
import './auth-layout.scss';

export const AuthLayout: FC = () => {
    return (
        <div className='container-auth'>
            <div className='auth-layout'>
                <div className='auth-layout__wrap'>
                    <div className='auth-layout__content'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};
