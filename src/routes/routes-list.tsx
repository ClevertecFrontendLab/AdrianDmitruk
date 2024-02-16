import { MainLayout } from '@components/layout';
import { MainPage } from '@pages/main-page';
import { Route, Routes } from 'react-router-dom';

export const RoutesList = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<MainPage />} />
            </Route>
        </Routes>
    );
};
