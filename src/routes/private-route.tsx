import { useAuth } from '@hooks/use-auth';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute: FC = () => {
    const { dataAuth } = useAuth();
    const isAuth = !!dataAuth?.accessToken;

    return isAuth ? <Outlet /> : <Navigate to='/auth' />;
};
