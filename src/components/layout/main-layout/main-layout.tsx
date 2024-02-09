import { FC } from 'react';

import { Navbar } from '@components/navbar';
import { Layout } from 'antd';

import { Footer } from '@components/footer';
import { Header } from '@components/header';
import { Outlet } from 'react-router-dom';
import './main-layout.scss';

const { Content } = Layout;

export const MainLayout: FC = () => {
    return (
        <Layout className='container' style={{ position: 'relative' }}>
            <Navbar />
            <Layout className='site-layout'>
                <Header />
                <Content className='site-layout-background'>
                    <Outlet />
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};
