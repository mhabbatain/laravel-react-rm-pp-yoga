import MainContainer from '@/components/main-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { daftarPesanan } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, Filter, Search } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Pesanan',
        href: daftarPesanan().url,
    },
];

export default function DaftarPesanan() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('semua');

    // Mock data - daftar pesanan
    const orders = [
        {
            id: '001',
            orderNumber: 'ORD-2024-001',
            customerName: 'Budi Santoso',
            orderTime: '2024-01-15 14:30',
            status: 'Diproses',
            total: 148500,
            itemCount: 4,
        },
        {
            id: '002',
            orderNumber: 'ORD-2024-002',
            customerName: 'Siti Rahma',
            orderTime: '2024-01-15 15:15',
            status: 'Selesai',
            total: 85000,
            itemCount: 3,
        },
        {
            id: '003',
            orderNumber: 'ORD-2024-003',
            customerName: 'Ahmad Rizki',
            orderTime: '2024-01-15 15:45',
            status: 'Diproses',
            total: 125000,
            itemCount: 5,
        },
        {
            id: '004',
            orderNumber: 'ORD-2024-004',
            customerName: 'Dewi Lestari',
            orderTime: '2024-01-15 16:20',
            status: 'Selesai',
            total: 95000,
            itemCount: 2,
        },
        {
            id: '005',
            orderNumber: 'ORD-2024-005',
            customerName: 'Joko Widodo',
            orderTime: '2024-01-15 16:50',
            status: 'Dibatalkan',
            total: 75000,
            itemCount: 3,
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'diproses':
                return 'bg-warning text-warning-foreground';
            case 'selesai':
                return 'bg-success text-success-foreground';
            case 'dibatalkan':
                return 'bg-destructive text-destructive-foreground';
            default:
                return 'bg-secondary text-secondary-foreground';
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.orderNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            order.customerName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesStatus =
            statusFilter === 'semua' ||
            order.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
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
                    <CardContent className="pt-6">
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
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-muted-foreground" />
                                <Select
                                    value={statusFilter}
                                    onValueChange={setStatusFilter}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Filter Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="semua">
                                            Semua Status
                                        </SelectItem>
                                        <SelectItem value="diproses">
                                            Diproses
                                        </SelectItem>
                                        <SelectItem value="selesai">
                                            Selesai
                                        </SelectItem>
                                        <SelectItem value="dibatalkan">
                                            Dibatalkan
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
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
                                    <TableHead>Pelanggan</TableHead>
                                    <TableHead>Waktu</TableHead>
                                    <TableHead className="text-center">
                                        Item
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Total
                                    </TableHead>
                                    <TableHead className="text-center">
                                        Status
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
                                        <TableCell>
                                            {order.customerName}
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
                                            <Badge
                                                className={getStatusColor(
                                                    order.status,
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
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
