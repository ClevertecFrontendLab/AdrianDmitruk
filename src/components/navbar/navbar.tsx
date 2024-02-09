import {
    CalendarOutlined,
    HeartFilled,
    IdcardOutlined,
    ImportOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

import cleverLogo from '../../assets/clever-logo.png';
import fitLogo from '../../assets/fit-logo.png';

import { useWindowWidth } from '@hooks/use-window-width';
import cn from 'classnames';

const { Sider } = Layout;

export const Navbar: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const isMobile = useWindowWidth(550);

    const logoClassName = cn('navbar_logo', { logo_small: collapsed });

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            theme='light'
            width={isMobile ? 106 : 208}
            collapsedWidth={isMobile ? 0 : 64}
            className='nav'
        >
            <div className={logoClassName}>
                <Link to='/' className='logo'>
                    <img className='logo_img' src={collapsed ? fitLogo : cleverLogo} alt='logo' />
                </Link>
            </div>

            <Menu
                theme='light'
                mode='inline'
                className='nav_menu'
                defaultSelectedKeys={['0']}
                items={[
                    {
                        key: '1',
                        icon: !isMobile && <CalendarOutlined className='nav_icon' />,
                        label: 'Календарь',
                        className: 'custom-menu-item',
                    },
                    {
                        key: '2',
                        icon: !isMobile && <HeartFilled className='nav_icon' />,
                        label: 'Тренировки',
                        className: 'custom-menu-item',
                    },
                    {
                        key: '3',
                        icon: !isMobile && <TrophyFilled className='nav_icon' />,
                        label: 'Достижения',
                        className: 'custom-menu-item',
                    },
                    {
                        key: '4',
                        icon: !isMobile && <IdcardOutlined className='nav_icon' />,
                        label: 'Профиль',
                    },
                ]}
            />

            <Menu
                theme='light'
                mode='inline'
                className='nav_log'
                defaultSelectedKeys={['0']}
                items={[
                    {
                        key: '1',
                        icon: !isMobile && <ImportOutlined className='nav_icon-log' />,
                        label: <span className='nav_log-text'>Выход</span>,
                        className: 'nav_log-item',
                    },
                ]}
            />

            <div className='icon-container'>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
            </div>
        </Sider>
    );
};
