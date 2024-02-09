import { FC } from 'react';

import { Navbar } from '@components/navbar';
import { Layout } from 'antd';

import './main-layout.css';

const { Header, Content } = Layout;

export const MainLayout: FC = () => {
    return (
        <Layout className='container' style={{ position: 'relative' }}>
            <Navbar />
            <Layout className='site-layout'>
                <Header className='site-layout-background' style={{ padding: 0 }}>
                    asdasd
                </Header>
                <Content
                    className='site-layout-background'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>
                <Content
                    className='site-layout-background'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
