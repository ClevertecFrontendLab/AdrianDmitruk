import { ReactNode } from 'react';

export interface ICardBoxProps {
    title: string;
    subtitle?: string;
    className?: string;
    children: ReactNode;
}
