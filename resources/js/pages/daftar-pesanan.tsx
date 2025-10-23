import MainContainer from '@/components/main-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { orders as ordersData } from '@/data/orders';
import AppLayout from '@/layouts/app-layout';
import { daftarPesanan } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, Search } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Pesanan',
        href: daftarPesanan().url,
    },
];

export default function DaftarPesanan() {
    const [searchQuery, setSearchQuery] = useState('');

    // Centralized order data
    const orders = ordersData;

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.customerName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return matchesSearch;
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Pesanan" />
            <MainContainer>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Daftar Pesanan
                        </h1>
                        <p className="text-muted-foreground">
                            Kelola semua pesanan rumah makan
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari nomor pesanan atau nama pelanggan..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pesanan ({filteredOrders.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nomor Pesanan</TableHead>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead className="text-center">
                                        Item
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Total
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow
                                        key={order.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">
                                            {order.orderNumber}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {order.orderTime}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {order.itemCount} item
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            Rp{' '}
                                            {order.total.toLocaleString(
                                                'id-ID',
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Link
                                                href={`/daftar-pesanan/${order.id}`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    Detail
                                                </Button>
                                            </Link>{' '}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredOrders.length === 0 && (
                            <div className="py-12 text-center text-muted-foreground">
                                Tidak ada pesanan yang ditemukan
                            </div>
                        )}
                    </CardContent>
                </Card>
            </MainContainer>
        </AppLayout>
    );
}
