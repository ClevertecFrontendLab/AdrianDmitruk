import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';
import { CardBox } from '..';
import './footer.scss';

export const Footer: FC = () => {
    return (
        <footer className='footer'>
            <Button className='footer__btn' type='text'>
                Смотреть отзывы
            </Button>

            <CardBox title='Скачать на телефон' subtitle='Доступно в PRO-тарифе'>
                <Button className='footer__btn--card' type='text' icon={<AndroidFilled />}>
                    Android OS
                </Button>
                <Button className='footer__btn--card' type='text' icon={<AppleFilled />}>
                    Apple iOS
                </Button>
            </CardBox>
        </footer>
    );
};
