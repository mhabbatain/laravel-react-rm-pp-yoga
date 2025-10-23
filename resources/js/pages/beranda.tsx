import MainContainer from '@/components/main-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { beranda } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, TrendingUp, Users, UtensilsCrossed } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Beranda',
        href: beranda().url,
    },
];

export default function Beranda() {
    const stats = [
        {
            title: 'Pesanan Hari Ini',
            value: '45',
            icon: FileText,
            color: 'text-primary',
        },
        {
            title: 'Total Karyawan',
            value: '12',
            icon: Users,
            color: 'text-accent',
        },
        {
            title: 'Menu Aktif',
            value: '38',
            icon: UtensilsCrossed,
            color: 'text-success',
        },
        {
            title: 'Pendapatan Hari Ini',
            value: 'Rp 4.5jt',
            icon: TrendingUp,
            color: 'text-warning',
        },
    ];

    const recentOrders = [
        {
            id: 'ORD-001',
            customer: 'Budi Santoso',
            total: 148500,
            status: 'Diproses',
        },
        {
            id: 'ORD-002',
            customer: 'Siti Aminah',
            total: 95000,
            status: 'Selesai',
        },
        {
            id: 'ORD-003',
            customer: 'Ahmad Fauzi',
            total: 120000,
            status: 'Diproses',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Beranda" />
            <MainContainer>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Beranda
                    </h1>
                    <p className="text-muted-foreground">
                        Beranda Sistem POS Rumah Makan PP Yoga
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </CardTitle>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-foreground">
                                        {stat.value}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recent Orders */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Pesanan Terbaru</CardTitle>
                            <Link
                                href="/detail-pesanan"
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                Lihat Semua
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between border-b border-border pb-4 last:border-0"
                                >
                                    <div>
                                        <p className="font-medium text-foreground">
                                            {order.id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.customer}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-foreground">
                                            Rp{' '}
                                            {order.total.toLocaleString(
                                                'id-ID',
                                            )}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Link href="/orders">
                        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        Kelola Pesanan
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Lihat detail pesanan
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/karyawan">
                        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-full bg-accent/10 p-3">
                                    <Users className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        Kelola Karyawan
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Manajemen karyawan
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/menu">
                        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                            <CardContent className="flex items-center gap-4 p-6">
                                <div className="rounded-full bg-success/10 p-3">
                                    <UtensilsCrossed className="h-6 w-6 text-success" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">
                                        Kelola Menu
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Atur menu makanan
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </MainContainer>
        </AppLayout>
    );
}
