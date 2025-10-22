import MainContainer from '@/components/main-container';
import AppLayout from '@/layouts/app-layout';
import { daftarMenu } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Menu',
        href: daftarMenu().url,
    },
];

export default function DaftarMenu() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const menuItems = {
        makanan: [
            {
                id: 1,
                name: 'Nasi Goreng Spesial',
                price: 35000,
                status: 'Tersedia',
            },
            {
                id: 2,
                name: 'Ayam Goreng Kremes',
                price: 40000,
                status: 'Tersedia',
            },
            { id: 3, name: 'Mie Goreng Jawa', price: 30000, status: 'Habis' },
            { id: 4, name: 'Soto Ayam', price: 25000, status: 'Tersedia' },
        ],
        minuman: [
            { id: 5, name: 'Es Teh Manis', price: 5000, status: 'Tersedia' },
            { id: 6, name: 'Jus Alpukat', price: 15000, status: 'Tersedia' },
            { id: 7, name: 'Es Jeruk', price: 8000, status: 'Tersedia' },
            { id: 8, name: 'Kopi Susu', price: 12000, status: 'Habis' },
        ],
        tambahan: [
            { id: 9, name: 'Kerupuk', price: 3000, status: 'Tersedia' },
            { id: 10, name: 'Sambal Extra', price: 2000, status: 'Tersedia' },
            {
                id: 11,
                name: 'Telur Mata Sapi',
                price: 5000,
                status: 'Tersedia',
            },
        ],
    };

    const getStatusColor = (status: string) => {
        return status === 'Tersedia'
            ? 'bg-success text-success-foreground'
            : 'bg-destructive text-destructive-foreground';
    };

    const filterItems = (items: typeof menuItems.makanan) => {
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    };
    const MenuCard = ({ item }: { item: (typeof menuItems.makanan)[0] }) => (
        <Card className="transition-shadow hover:shadow-lg">
            <CardContent className="p-6">
                <div className="space-y-4">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">
                                {item.name}
                            </h3>
                            <p className="text-xl font-bold text-primary">
                                Rp {item.price.toLocaleString('id-ID')}
                            </p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                            {item.status}
                        </Badge>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                            <Trash2 className="mr-2 h-3 w-3 text-destructive" />
                            Hapus
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Menu" />
            <MainContainer>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Manajemen Menu
                    </h1>
                    <p className="text-muted-foreground">
                        Kelola daftar menu rumah makan
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>Daftar Menu</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari menu..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pl-10 md:w-64"
                                    />
                                </div>
                                <Dialog
                                    open={isDialogOpen}
                                    onOpenChange={setIsDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Tambah Menu
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Menu Baru
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="menuName">
                                                    Nama Menu
                                                </Label>
                                                <Input
                                                    id="menuName"
                                                    placeholder="Masukkan nama menu"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="description">
                                                    Deskripsi
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    placeholder="Deskripsi menu (opsional)"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="price">
                                                    Harga
                                                </Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    placeholder="25000"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="category">
                                                    Kategori
                                                </Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kategori" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="makanan">
                                                            Makanan
                                                        </SelectItem>
                                                        <SelectItem value="minuman">
                                                            Minuman
                                                        </SelectItem>
                                                        <SelectItem value="tambahan">
                                                            Tambahan
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="status">
                                                    Status
                                                </Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="tersedia">
                                                            Tersedia
                                                        </SelectItem>
                                                        <SelectItem value="habis">
                                                            Habis
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="flex gap-2 pt-4">
                                                <Button
                                                    className="flex-1"
                                                    onClick={() =>
                                                        setIsDialogOpen(false)
                                                    }
                                                >
                                                    Simpan
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() =>
                                                        setIsDialogOpen(false)
                                                    }
                                                >
                                                    Batal
                                                </Button>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="makanan" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="makanan">
                                    Makanan
                                </TabsTrigger>
                                <TabsTrigger value="minuman">
                                    Minuman
                                </TabsTrigger>
                                <TabsTrigger value="tambahan">
                                    Tambahan
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="makanan" className="mt-6">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filterItems(menuItems.makanan).map(
                                        (item) => (
                                            <MenuCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ),
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="minuman" className="mt-6">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filterItems(menuItems.minuman).map(
                                        (item) => (
                                            <MenuCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ),
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="tambahan" className="mt-6">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filterItems(menuItems.tambahan).map(
                                        (item) => (
                                            <MenuCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ),
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </MainContainer>
        </AppLayout>
    );
}
