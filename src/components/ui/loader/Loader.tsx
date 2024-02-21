import { FC } from 'react';

import Lottie from 'react-lottie';

import animation from '../../../assets/animation.json';

import { useAuth } from '@hooks/use-auth';
import { Status } from '@redux/auth/types';
import './loader.scss';

interface ILoaderProps {
    active?: boolean;
}

export const Loader: FC<ILoaderProps> = ({ active }) => {
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
            {(statusAuth === Status.LOADING || active) && (
                <>
                    <div className='loader-bg'></div>
                    <div data-test-id='loader' className='loader'>
                        <Lottie options={defaultOptions} />
                    </div>
                </>
            )}
        </>
    );
};
