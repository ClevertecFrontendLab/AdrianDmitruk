import { FC } from 'react';

import { Button, Layout } from 'antd';

const { Header: HeaderLayout } = Layout;

import { Typography } from 'antd';

import { SettingOutlined } from '@ant-design/icons';
import { useWindowWidth } from '@hooks/use-window-width';
import { Link } from 'react-router-dom';
import './header.scss';

const { Title } = Typography;

export const Header: FC = () => {
    const isTablet = useWindowWidth(940);

    const isMobile = useWindowWidth(610);

    return (
        <HeaderLayout className='site-layout-background header'>
            <Link className='header__link' to={'/'}>
                Главная
            </Link>

            <div className='header__wrap'>
                <Title className='header__wrap--title'>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>

                {isMobile ? (
                    <Button shape='circle' icon={<SettingOutlined />} />
                ) : (
                    <Button type='text' icon={!isTablet && <SettingOutlined />}>
                        Настройки
                    </Button>
                )}
            </div>
        </HeaderLayout>
    );
};
