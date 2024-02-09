import { FC } from 'react';

import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { CardBox, CardInfo } from '@components/card';
import { Button } from 'antd';
import './main-page.scss';

export const MainPage: FC = () => {
    return (
        <div className='main'>
            <CardInfo>
                <ul className='main__list-info'>
                    <li>С CleverFit ты сможешь: </li>
                    <li>
                        — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                    </li>
                    <li>
                        — отслеживать свои достижения в разделе статистики, сравнивая свои
                        результаты с нормами и рекордами;
                    </li>
                    <li>
                        — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы
                        о тренировках;
                    </li>
                    <li>
                        — выполнять расписанные тренировки для разных частей тела, следуя подробным
                        инструкциям и советам профессиональных тренеров.
                    </li>
                </ul>
            </CardInfo>
            <div className='main__card'>
                <CardInfo>
                    <h3 className='main__title-info'>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </h3>
                </CardInfo>
                <div className='main__card--list'>
                    <CardBox title='Расписать тренировки'>
                        <Button className='main__card--btn' type='text' icon={<HeartFilled />}>
                            Тренировки
                        </Button>
                    </CardBox>
                    <CardBox title='Назначить календарь'>
                        <Button className='main__card--btn' type='text' icon={<CalendarOutlined />}>
                            Календарь
                        </Button>
                    </CardBox>
                    <CardBox title='Заполнить профиль'>
                        <Button className='main__card--btn' type='text' icon={<IdcardOutlined />}>
                            Профиль
                        </Button>
                    </CardBox>
                </div>
            </div>
        </div>
    );
};
