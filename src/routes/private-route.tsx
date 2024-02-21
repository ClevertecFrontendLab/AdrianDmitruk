import { useAuth } from '@hooks/use-auth';
import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IPrivateRouteProps {
    children?: ReactNode;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
    const { dataAuth } = useAuth();
    const isAuth = dataAuth?.accessToken;

    if (!isAuth) {
        return <Navigate to='/auth' replace />;
    }

    return children ? children : <Outlet />;
};
