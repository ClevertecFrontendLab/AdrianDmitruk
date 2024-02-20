import { AuthLayout, MainLayout } from '@components/layout';
import { AuthPage } from '@pages/auth-page';
import { ChangePasswordPage } from '@pages/change-password-page';
import { ConfirmEmailPage } from '@pages/confirm-email-page';
import { ErrorPage } from '@pages/error-page';
import { MainPage } from '@pages/main-page';
import { SuccessPage } from '@pages/success-page';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DASHBOARD_PAGES } from '../config/pages-url';

export const RoutesList: FC = () => {
    return (
        <Routes>
            {/* <Route element={<AuthLayout />}>
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

            <Route element={<MainLayout />}>
                <Route path={DASHBOARD_PAGES.HOME} element={<MainPage />} />
            </Route> */}

            <Route path={DASHBOARD_PAGES.LOGIN} element={<AuthLayout />}>
                <Route index={true} element={<AuthPage />} />
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

            <Route element={<MainLayout />}>
                <Route path={DASHBOARD_PAGES.HOME} element={<MainPage />} />
            </Route>
        </Routes>
    );
};
