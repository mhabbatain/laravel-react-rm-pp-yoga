import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function formatDateTime(created_at?: string | Date) {
    if (!created_at) return '-';
    const date = new Date(created_at);
    if (isNaN(date.getTime())) return '-';

    const tanggal = date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'numeric',
        year: 'numeric',
    });

    const waktu = date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return `${tanggal}, ${waktu}`;
}
