"use client";

import { LAVENDER, RED } from '@/constants';
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
                        className="toast"
                        style={{ opacity: t.visible ? 1 : 0, borderColor: t.type === 'error' ? RED : LAVENDER }}
                    >
                        {resolveValue(t.message, t)}
                    </div>
                )}
        </Toaster>
    </>;
};