import MainContainer from '@/components/main-container';
import { menuItems } from '@/data/menuData';
import AppLayout from '@/layouts/app-layout';
import { daftarMenu } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { MenuItem } from '@/types/menu';
import { Head } from '@inertiajs/react';

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
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [menus] = useState<MenuItem[]>(menuItems);
    const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [editPreviewImage, setEditPreviewImage] = useState<string | null>(
        null,
    );

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        isEdit: boolean = false,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (isEdit) {
                    setEditPreviewImage(reader.result as string);
                } else {
                    setPreviewImage(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const filterItems = (category: MenuItem['category']) => {
        return menus.filter(
            (item) =>
                item.category === category &&
                item.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    };

    const MenuCard = ({ item }: { item: MenuItem }) => (
        <Card className="transition-shadow hover:shadow-lg">
            <div className="aspect-4/3 overflow-hidden bg-muted">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardContent>
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
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                                setSelectedMenu(item);
                                setIsEditDialogOpen(true);
                            }}
                        >
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                                setSelectedMenu(item);
                                setIsDeleteDialogOpen(true);
                            }}
                        >
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
                                    onOpenChange={(open) => {
                                        setIsDialogOpen(open);
                                        if (!open) {
                                            setPreviewImage(null);
                                        }
                                    }}
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
                                                <Label htmlFor="stok">
                                                    Stok
                                                </Label>
                                                <Input
                                                    id="stok"
                                                    type="number"
                                                    placeholder="0"
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
                                                <Label htmlFor="image">
                                                    Gambar Menu
                                                </Label>
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="cursor-pointer"
                                                />
                                                {previewImage && (
                                                    <div className="mt-2 overflow-hidden rounded-md border">
                                                        <img
                                                            src={previewImage}
                                                            alt="Preview"
                                                            className="aspect-video h-auto w-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-2 pt-4">
                                                <Button
                                                    className="flex-1"
                                                    onClick={() => {
                                                        setIsDialogOpen(false);
                                                        setPreviewImage(null);
                                                    }}
                                                >
                                                    Simpan
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() => {
                                                        setIsDialogOpen(false);
                                                        setPreviewImage(null);
                                                    }}
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
                                    {filterItems('makanan').map((item) => (
                                        <MenuCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="minuman" className="mt-6">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filterItems('minuman').map((item) => (
                                        <MenuCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="tambahan" className="mt-6">
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {filterItems('tambahan').map((item) => (
                                        <MenuCard key={item.id} item={item} />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Modal Edit */}
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (!open) {
                            setEditPreviewImage(null);
                        }
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Menu</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Nama Menu</Label>
                                <Input
                                    id="edit-name"
                                    placeholder="Masukkan nama menu"
                                    value={selectedMenu?.name}
                                    onChange={(e) =>
                                        setSelectedMenu(
                                            selectedMenu
                                                ? {
                                                      ...selectedMenu,
                                                      name: e.target.value,
                                                  }
                                                : null,
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-price">Harga</Label>
                                <Input
                                    id="edit-price"
                                    type="number"
                                    placeholder="25000"
                                    value={selectedMenu?.price}
                                    onChange={(e) =>
                                        setSelectedMenu(
                                            selectedMenu
                                                ? {
                                                      ...selectedMenu,
                                                      price: Number(
                                                          e.target.value,
                                                      ),
                                                  }
                                                : null,
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-stok">Stok</Label>
                                <Input
                                    id="edit-stok"
                                    type="number"
                                    placeholder="0"
                                    value={selectedMenu?.stok}
                                    onChange={(e) =>
                                        setSelectedMenu(
                                            selectedMenu
                                                ? {
                                                      ...selectedMenu,
                                                      stok: Number(
                                                          e.target.value,
                                                      ),
                                                  }
                                                : null,
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-category">Kategori</Label>
                                <Select
                                    value={selectedMenu?.category}
                                    onValueChange={(value) =>
                                        setSelectedMenu(
                                            selectedMenu
                                                ? {
                                                      ...selectedMenu,
                                                      category:
                                                          value as MenuItem['category'],
                                                  }
                                                : null,
                                        )
                                    }
                                >
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
                                <Label htmlFor="edit-image">Gambar Menu</Label>
                                <div className="mb-4 overflow-hidden rounded-md border">
                                    <img
                                        src={
                                            editPreviewImage ||
                                            selectedMenu?.image
                                        }
                                        alt={selectedMenu?.name}
                                        className="aspect-video h-auto w-full object-cover"
                                    />
                                </div>
                                <Input
                                    id="edit-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, true)}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    className="flex-1"
                                    onClick={() => {
                                        // Handle update logic here
                                        setIsEditDialogOpen(false);
                                        setEditPreviewImage(null);
                                    }}
                                >
                                    Simpan
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setIsEditDialogOpen(false);
                                        setEditPreviewImage(null);
                                    }}
                                >
                                    Batal
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

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
                                Apakah Anda yakin ingin menghapus menu{' '}
                                <span className="font-semibold">
                                    {selectedMenu?.name}
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
