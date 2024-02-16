import { FC } from 'react';

import Lottie from 'react-lottie';

import animation from '../../../assets/animation.json';

import './Loader.scss';

export const Loader: FC = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    return (
        <>
            <div className='loader-bg'></div>
            <div className='loader'>
                <Lottie options={defaultOptions} />
            </div>
        </>
    );
};
