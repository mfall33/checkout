"use client";

import { BLACK, LAVENDER, RED, YELLOW } from '@/constants';
import { Toaster, resolveValue } from 'react-hot-toast';

type Props = {
    children?: React.ReactNode;
};

export const ToastProvider = ({ children }: Props) => {
    return <>
        {children}
        <Toaster
            position="bottom-center">
            {
                (t) => (
                    <div
                        className="toast container m-auto"
                        style={{ opacity: t.visible ? 1 : 0, borderColor: t.type === 'error' ? RED : BLACK }}
                    >
                        {resolveValue(t.message, t)}
                    </div>
                )}
        </Toaster>
    </>;
};