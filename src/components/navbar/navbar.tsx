import {
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

import cleverLogo from '../../assets/clever-logo.png';
import fitLogo from '../../assets/fit-logo.png';

import { useWindowWidth } from '@hooks/use-window-width';
import cn from 'classnames';
import { Calendar } from '../../assets/icon/calendar';
import { Exit } from '../../assets/icon/exit';

const { Sider } = Layout;

export const Navbar: FC = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const isMobile = useWindowWidth(550);

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
            <div
                className={cn('nav__logo', {
                    ['nav__logo--small']: collapsed,
                })}
            >
                <Link to='/' className='nav__logo--link'>
                    <img
                        className='nav__logo--img'
                        src={collapsed ? fitLogo : cleverLogo}
                        alt='logo'
                    />
                </Link>
            </div>

            <Menu
                theme='light'
                mode='inline'
                className='nav__menu'
                defaultSelectedKeys={['0']}
                items={[
                    {
                        key: '1',
                        icon: !isMobile && (
                            <span className='nav__menu--icon-wrap'>
                                <Calendar />
                            </span>
                        ),
                        label: 'Календарь',
                        className: 'nav__menu--item',
                    },
                    {
                        key: '2',
                        icon: !isMobile && <HeartFilled className='nav__menu--icon' />,
                        label: 'Тренировки',
                        className: 'nav__menu--item',
                    },
                    {
                        key: '3',
                        icon: !isMobile && <TrophyFilled className='nav__menu--icon' />,
                        label: 'Достижения',
                        className: 'nav__menu--item',
                    },
                    {
                        key: '4',
                        icon: !isMobile && <IdcardOutlined className='nav__menu--icon' />,
                        label: 'Профиль',
                    },
                ]}
            />

            <Menu
                theme='light'
                mode='inline'
                className='nav__logout'
                defaultSelectedKeys={['0']}
                items={[
                    {
                        key: '1',
                        icon: !isMobile && (
                            <span className='nav__menu--icon-wrap'>
                                <Exit />
                            </span>
                        ),
                        label: <span className='nav__logout--name'>Выход</span>,
                        className: 'nav__logout--item',
                    },
                ]}
            />

            <div
                className='nav__burger'
                data-test-id={isMobile ? 'sider-switch-mobile' : 'sider-switch'}
            >
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
            </div>
        </Sider>
    );
};
