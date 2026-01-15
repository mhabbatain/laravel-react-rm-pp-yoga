import { cn } from '@/lib/utils';
import React from 'react';

export default function MainContainer({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div
            className={cn(
                'flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4',
                className,
            )}
        >
            {children}
        </div>
    );
}
