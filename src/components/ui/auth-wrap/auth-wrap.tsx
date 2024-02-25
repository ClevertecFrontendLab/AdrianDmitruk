import { FC } from 'react';

import styles from './auth-wrap.module.scss';
import { IAuthWrapProps } from './type';

export const AuthWrap: FC<IAuthWrapProps> = ({ cn, children }) => {
    return <div className={`${styles.wrap} ${cn}`}>{children}</div>;
};
