import MainContainer from '@/components/main-container';
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
import { formatDateTime } from '@/lib/utils';
import daftarPesanan from '@/routes/daftar-pesanan';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Calendar, Eye, Search } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Pesanan',
        href: daftarPesanan.index().url,
    },
];

type FilterPeriode = 'semua' | 'harian' | 'mingguan' | 'bulanan' | 'tahunan';

const filterOptions: { value: FilterPeriode; label: string }[] = [
    { value: 'semua', label: 'Semua Waktu' },
    { value: 'harian', label: 'Hari Ini' },
    { value: 'mingguan', label: 'Minggu Ini' },
    { value: 'bulanan', label: 'Bulan Ini' },
    { value: 'tahunan', label: 'Tahun Ini' },
];

export default function DaftarPesanan() {
    // DATA
    const { pesanans, currentFilter } = usePage<SharedData>().props;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState<FilterPeriode>(
        (currentFilter as FilterPeriode) || 'semua',
    );

    const handleFilterChange = (value: FilterPeriode) => {
        setSelectedFilter(value);
        router.get(
            '/daftar-pesanan',
            { filter: value },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const filteredOrders = pesanans?.filter((pesanan) => {
        const matchesSearch = pesanan.nomor_pesanan
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Hitung total pendapatan dari pesanan yang difilter
    const totalPendapatan =
        filteredOrders?.reduce((sum, pesanan) => sum + pesanan.total, 0) || 0;

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
                                    placeholder="Cari nomor pesanan..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <Select
                                    value={selectedFilter}
                                    onValueChange={(value) =>
                                        handleFilterChange(
                                            value as FilterPeriode,
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pilih periode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterOptions.map((option) => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Pesanan ({filteredOrders?.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-auto">
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
                                    {filteredOrders?.map((pesanan) => (
                                        <TableRow
                                            key={pesanan.id}
                                            className="cursor-pointer hover:bg-muted/50"
                                        >
                                            <TableCell className="font-medium">
                                                {pesanan.nomor_pesanan}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {formatDateTime(
                                                    pesanan.created_at,
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {pesanan.detail_pesanans
                                                    ?.length || 0}{' '}
                                                item
                                            </TableCell>

                                            <TableCell className="text-right font-semibold">
                                                Rp{' '}
                                                {pesanan.total.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Link
                                                    href={`/daftar-pesanan/${pesanan.id}`}
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
                        </div>
                        {filteredOrders?.length === 0 && (
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
