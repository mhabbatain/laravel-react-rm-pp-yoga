import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-white p-6 md:p-10">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-orange-100 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-100 blur-3xl" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-200/50 md:p-10">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-6">
                            <Link
                                href={home()}
                                className="group flex flex-col items-center gap-3 font-medium transition-transform duration-300 hover:scale-105"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25 transition-shadow duration-300 group-hover:shadow-orange-500/40">
                                    <AppLogoIcon className="size-10 fill-current text-white" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                                    {title}
                                </h1>
                                <p className="text-sm text-gray-500">
                                    {description}
                                </p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>

                {/* Footer text */}
                <p className="mt-6 text-center text-xs text-gray-400">
                    © 2026 Rumah Makan. All rights reserved.
                </p>
            </div>
        </div>
    );
}
