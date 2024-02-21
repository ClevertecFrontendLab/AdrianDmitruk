import { FC } from 'react';

import Lottie from 'react-lottie';

import animation from '../../../assets/animation.json';

import { useAuth } from '@hooks/use-auth';
import { Status } from '@redux/auth/types';
import './loader.scss';

export const Loader: FC = () => {
    const { statusAuth } = useAuth();

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
            {statusAuth === Status.LOADING && (
                <>
                    <div data-test-id='loader' className='loader-bg'></div>
                    <div className='loader'>
                        <Lottie options={defaultOptions} />
                    </div>
                </>
            )}
        </>
    );
};
