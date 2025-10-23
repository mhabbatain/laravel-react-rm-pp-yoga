import MainContainer from '@/components/main-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getOrderById } from '@/data/orders';
import AppLayout from '@/layouts/app-layout';
import { detailDaftarPesanan } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowLeft, Edit, Printer } from 'lucide-react';
import { useState } from 'react';

export default function DetailDaftarPesanan({ id }: { id: string }) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const orderFromData = getOrderById(id);

    const orderData = orderFromData ?? {
        id,
        orderNumber: `ORD-2024-${id?.padStart(3, '0')}`,
        customerName: '-',
        orderTime: '-',
        status: 'Tidak Diketahui',
        items: [],
        subtotal: 0,
        tax: 0,
        total: 0,
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Detail Pesanan ${id}`,
            href: detailDaftarPesanan(id).url,
        },
    ];

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
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                    Waktu Pemesanan
                                </p>
                                <p className="mt-1 text-lg font-semibold text-foreground">
                                    {orderData.orderTime}
                                </p>
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
                        variant="destructive"
                        className="flex-1"
                        onClick={() => setIsDeleteDialogOpen(true)}
                    >
                        <Edit className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>

                {/* Modal Delete */}
                <Dialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p>
                                Apakah Anda yakin ingin menghapus pesanan{' '}
                                <span className="font-semibold">
                                    {orderData.orderNumber}
                                </span>
                                ?
                            </p>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => {
                                        // Handle delete logic here
                                        setIsDeleteDialogOpen(false);
                                        // Redirect back to daftar pesanan after delete
                                        window.history.back();
                                    }}
                                >
                                    Hapus
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsDeleteDialogOpen(false)}
                                >
                                    Batal
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </MainContainer>
        </AppLayout>
    );
}
