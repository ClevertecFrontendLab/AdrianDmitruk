import { AuthLayout, MainLayout } from '@components/layout';
import {
    AuthPage,
    ChangePasswordPage,
    ConfirmEmailPage,
    ErrorPage,
    SuccessPage,
} from '@pages/auth-page';

import { Loader } from '@components/ui';
import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DASHBOARD_PAGES } from '../../config';
import { PrivateRoute } from '../private-route';
import { PublicRoute } from '../public-route';

const MainPage = React.lazy(() => import('@pages/main-page/main-page'));

export const routes = (
    <Routes>
        <Route path='/' element={<Navigate to={DASHBOARD_PAGES.HOME} />} />
        <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
                <Route path={DASHBOARD_PAGES.LOGIN} element={<AuthPage />} />
                <Route path={DASHBOARD_PAGES.REGISTRATION} element={<AuthPage />} />

                <Route path='/' element={<Navigate to={DASHBOARD_PAGES.LOGIN} />} />
                <Route path={DASHBOARD_PAGES.LOGIN} element={<AuthPage />} />
                <Route path={DASHBOARD_PAGES.REGISTRATION} element={<AuthPage />} />
                <Route path={DASHBOARD_PAGES.ERROR_LOGIN} element={<ErrorPage />} />
                <Route path={DASHBOARD_PAGES.ERROR_USER_EXIST} element={<ErrorPage />} />
                <Route path={DASHBOARD_PAGES.ERROR} element={<ErrorPage />} />
                <Route path={DASHBOARD_PAGES.SUCCESS} element={<SuccessPage />} />
                <Route path={DASHBOARD_PAGES.ERROR_CHECK_EMAIL_NO_EXIST} element={<ErrorPage />} />
                <Route path={DASHBOARD_PAGES.ERROR_CHECK_EMAIL} element={<ErrorPage />} />
                <Route path={DASHBOARD_PAGES.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
                <Route path={DASHBOARD_PAGES.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
                <Route path={DASHBOARD_PAGES.ERROR_CHANGE_PASSWORD} element={<ErrorPage />} />
                <Route path={DASHBOARD_PAGES.SUCCESS_CHANGE_PASSWORD} element={<SuccessPage />} />
            </Route>
        </Route>
        <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
                <Route
                    path={DASHBOARD_PAGES.HOME}
                    element={
                        <Suspense fallback={<Loader active />}>
                            <MainPage />
                        </Suspense>
                    }
                />
            </Route>
        </Route>
    </Routes>
);
