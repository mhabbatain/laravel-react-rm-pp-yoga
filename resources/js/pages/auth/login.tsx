import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';
import { Lock, Mail } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Selamat Datang"
            description="Masuk ke akun Anda untuk melanjutkan"
        >
            <Head title="Login" />

            {status && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Email
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="h-12 border-gray-300 bg-gray-50 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <Link
                                            href={request()}
                                            className="text-sm text-orange-600 transition-colors hover:text-orange-500"
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="h-12 border-gray-300 bg-gray-50 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-orange-500/20"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-gray-300 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="cursor-pointer text-sm text-gray-600"
                                >
                                    Ingat saya
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-2 h-12 w-full bg-gradient-to-r from-orange-600 to-amber-500 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02] hover:from-orange-500 hover:to-amber-400 hover:shadow-orange-500/40 active:scale-[0.98]"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <>
                                        <Spinner className="mr-2" />
                                        Memproses...
                                    </>
                                ) : (
                                    'Masuk'
                                )}
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm">
                                <span className="text-gray-500">
                                    Belum punya akun?{' '}
                                </span>
                                <Link
                                    href={register()}
                                    tabIndex={5}
                                    className="font-medium text-orange-600 transition-colors hover:text-orange-500"
                                >
                                    Daftar sekarang
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
