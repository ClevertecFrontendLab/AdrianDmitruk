import { FC } from 'react';

import './card-box.scss';
import { ICardBoxProps } from './type';

export const CardBox: FC<ICardBoxProps> = ({ title, subtitle, className, children }) => {
    return (
        <div className='card'>
            <div className='card__header'>
                <h4 className={`card__header--title, ${className}`}>{title}</h4>
                {subtitle && <p className='card__header--subtitle'>{subtitle}</p>}
            </div>
            <div className='card__btn'>{children}</div>
        </div>
    );
};
