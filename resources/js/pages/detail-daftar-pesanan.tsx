import MainContainer from '@/components/main-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { detailDaftarPesanan } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Edit, Printer } from 'lucide-react';

export default function DetailDaftarPesanan({ id }: { id: string }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Detail Daftar Pesanan',
            href: detailDaftarPesanan(id).url,
        },
    ];

    const orderData = {
        orderNumber: `ORD-2024-${id?.padStart(3, '0')}`,
        customerName: 'Budi Santoso',
        orderTime: '2024-01-15 14:30',
        status: 'Diproses',
        items: [
            {
                name: 'Nasi Goreng Spesial',
                quantity: 2,
                price: 35000,
                subtotal: 70000,
            },
            { name: 'Es Teh Manis', quantity: 2, price: 5000, subtotal: 10000 },
            {
                name: 'Ayam Goreng Kremes',
                quantity: 1,
                price: 40000,
                subtotal: 40000,
            },
            { name: 'Jus Alpukat', quantity: 1, price: 15000, subtotal: 15000 },
        ],
        subtotal: 135000,
        tax: 13500,
        total: 148500,
    };

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="DetailDaftarPesanan" />
            <MainContainer>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* <Link href={`/daftar-pesanan`}>
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link> */}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>

                        <div>
                            <h1 className="text-3xl font-bold text-foreground">
                                Detail Pemesanan
                            </h1>
                            <p className="text-muted-foreground">
                                Informasi lengkap pesanan
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Nomor Pesanan
                                </p>
                                <p className="mt-1 text-lg font-semibold text-foreground">
                                    {orderData.orderNumber}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Nama Pelanggan
                                </p>
                                <p className="mt-1 text-lg font-semibold text-foreground">
                                    {orderData.customerName}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Waktu Pemesanan
                                </p>
                                <p className="mt-1 text-lg font-semibold text-foreground">
                                    {orderData.orderTime}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                    Status
                                </p>
                                <Badge
                                    className={`mt-1 ${getStatusColor(orderData.status)}`}
                                >
                                    {orderData.status}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Items Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Item Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Menu</TableHead>
                                    <TableHead className="text-center">
                                        Jumlah
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Harga Satuan
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Subtotal
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderData.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            {item.name}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            Rp{' '}
                                            {item.price.toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            Rp{' '}
                                            {item.subtotal.toLocaleString(
                                                'id-ID',
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Summary Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ringkasan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between text-base">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="font-medium">
                                    Rp{' '}
                                    {orderData.subtotal.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="flex justify-between text-base">
                                <span className="text-muted-foreground">
                                    Pajak (10%)
                                </span>
                                <span className="font-medium">
                                    Rp {orderData.tax.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="border-t border-border pt-3">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Grand Total</span>
                                    <span className="text-primary">
                                        Rp{' '}
                                        {orderData.total.toLocaleString(
                                            'id-ID',
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Daftar Pesanan
                    </Button>
                    <Button variant="default" className="flex-1">
                        <Printer className="mr-2 h-4 w-4" />
                        Cetak Nota
                    </Button>
                    <Button
                        variant="default"
                        className="flex-1 bg-accent hover:bg-accent/90"
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Ubah Status
                    </Button>
                </div>
            </MainContainer>
        </AppLayout>
    );
}
