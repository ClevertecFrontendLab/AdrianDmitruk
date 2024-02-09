import { FC } from 'react';

import './card-info.scss';
import { ICardInfoProps } from './type';

export const CardInfo: FC<ICardInfoProps> = ({ children }) => {
    return <div className='card-info'>{children}</div>;
};
