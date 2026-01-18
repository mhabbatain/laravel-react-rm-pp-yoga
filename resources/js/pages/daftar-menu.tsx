import MainContainer from '@/components/main-container';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, MenuItem, SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';

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
import daftarMenu from '@/routes/daftar-menu';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner'; // <-- Tambahkan import toast

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Daftar Menu',
        href: daftarMenu.index().url,
    },
];

export default function DaftarMenu() {
    // DATA
    // Ambil 'menuItems' dan 'kategoris' dari props
    const { menuItems, kategoris } = usePage<SharedData>().props;

    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [editPreviewImage, setEditPreviewImage] = useState<string | null>(
        null,
    );

    // ===============================
    // FORM STATE (CREATE)
    // ===============================
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset: resetCreateForm,
    } = useForm({
        nama_menu: '',
        id_kategori: '', // Select akan memberikan string
        harga: '',
        stok: '',
        gambar: null as File | null,
    });

    // ===============================
    // FORM STATE (EDIT)
    // ===============================
    const {
        data: editData,
        setData: setEditData,
        post: updatePost,
        processing: updateProcessing,
        errors: editErrors,
        reset: resetEditForm,
    } = useForm({
        nama_menu: '',
        id_kategori: '',
        harga: '',
        stok: '',
        gambar: null as File | null,
        _method: 'PUT', // Penting untuk file upload pada method PUT
    });

    const handleOpenEditDialog = (item: MenuItem) => {
        // 1. Set item yang dipilih (untuk ID saat delete/update)
        setSelectedMenu(item);

        // 2. Siapkan data untuk form edit
        setEditData({
            nama_menu: item.nama_menu,
            // (Perbaikan kecil: gunakan id_kategori, bukan kategori.id)
            id_kategori: String(item.id_kategori),
            harga: String(item.harga),
            stok: String(item.stok),
            gambar: null,
            _method: 'PUT',
        });

        // 3. Set gambar preview awal dari data yang ada
        setEditPreviewImage(`/storage/${item.gambar}`);

        // 4. Buka dialog
        setIsEditDialogOpen(true);
    };

    // Handle perubahan file input
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        isEdit: boolean = false,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            if (isEdit) {
                setEditData('gambar', file);
                setEditPreviewImage(URL.createObjectURL(file));
            } else {
                setData('gambar', file);
                setPreviewImage(URL.createObjectURL(file));
            }
        }
    };

    // ===============================
    // HANDLER CREATE
    // ===============================
    const handleAddMenu = (e: FormEvent) => {
        e.preventDefault();
        post('/daftar-menu', {
            preserveScroll: true,
            onSuccess: () => {
                setIsDialogOpen(false);
                resetCreateForm();
                setPreviewImage(null);
                toast.success('Menu berhasil ditambahkan!');
            },
            onError: (errors) => {
                console.error(errors);
                toast.error(
                    'Gagal menambahkan menu. Periksa kembali isian Anda.',
                );
            },
        });
    };

    // ===============================
    // HANDLER UPDATE
    // ===============================
    const handleEditMenu = (e: FormEvent) => {
        e.preventDefault();
        if (!selectedMenu) return;

        // Inertia.js memerlukan POST untuk 'multipart/form-data'
        // 'editData' sudah mengandung _method: 'PUT'
        updatePost(`/daftar-menu/${selectedMenu.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditDialogOpen(false);
                resetEditForm();
                setEditPreviewImage(null);
                setSelectedMenu(null);
                toast.success('Menu berhasil diperbarui!');
            },
            onError: (errors) => {
                console.error(errors);
                toast.error(
                    'Gagal memperbarui menu. Periksa kembali isian Anda.',
                );
            },
        });
    };

    // ===============================
    // HANDLER DELETE
    // ===============================
    const handleDeleteMenu = () => {
        if (!selectedMenu) return;
        router.delete(`/daftar-menu/${selectedMenu.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setSelectedMenu(null);
                toast.success('Menu berhasil dihapus!');
            },
            onError: () => {
                toast.error('Gagal menghapus menu.');
            },
        });
    };

    const filterItems = (kategoriNama: string) => {
        return menuItems.filter(
            (item) =>
                item.kategori?.nama.toLowerCase() ===
                    kategoriNama.toLowerCase() &&
                item.nama_menu
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
        );
    };

    const MenuCard = ({ item }: { item: MenuItem }) => (
        <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
            <div className="aspect-video overflow-hidden bg-muted">
                <img
                    // Perbaiki path gambar untuk mengambil dari /storage/
                    src={`/storage/${item.gambar}`}
                    alt={item.nama_menu}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardContent className="flex flex-1 flex-col justify-between space-y-4 p-4">
                <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">
                        {item.nama_menu}
                    </h3>
                    <p className="text-xl font-bold text-primary">
                        Rp {item.harga.toLocaleString('id-ID')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Stok: {item.stok}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleOpenEditDialog(item)}
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
                                {/* ====================== */}
                                {/* DIALOG TAMBAH MENU */}
                                {/* ====================== */}
                                <Dialog
                                    open={isDialogOpen}
                                    onOpenChange={(open) => {
                                        setIsDialogOpen(open);
                                        if (!open) {
                                            resetCreateForm();
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
                                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Menu Baru
                                            </DialogTitle>
                                        </DialogHeader>
                                        <form
                                            onSubmit={handleAddMenu}
                                            className="space-y-4"
                                        >
                                            {/* Nama Menu */}
                                            <div className="space-y-2">
                                                <Label htmlFor="menuName">
                                                    Nama Menu
                                                </Label>
                                                <Input
                                                    id="menuName"
                                                    placeholder="Masukkan nama menu"
                                                    value={data.nama_menu}
                                                    onChange={(e) =>
                                                        setData(
                                                            'nama_menu',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.nama_menu && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.nama_menu}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Harga */}
                                            <div className="space-y-2">
                                                <Label htmlFor="harga">
                                                    Harga
                                                </Label>
                                                <Input
                                                    id="harga"
                                                    type="number"
                                                    placeholder="Masukkan harga (cth: 25000)"
                                                    value={data.harga}
                                                    onChange={(e) =>
                                                        setData(
                                                            'harga',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.harga && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.harga}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Stok */}
                                            <div className="space-y-2">
                                                <Label htmlFor="stok">
                                                    Stok
                                                </Label>
                                                <Input
                                                    id="stok"
                                                    type="number"
                                                    placeholder="Masukkan jumlah stok (cth: 12)"
                                                    value={data.stok}
                                                    onChange={(e) =>
                                                        setData(
                                                            'stok',
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                                {errors.stok && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.stok}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Kategori */}
                                            <div className="space-y-2">
                                                <Label htmlFor="kategori">
                                                    Kategori
                                                </Label>
                                                <Select
                                                    value={data.id_kategori}
                                                    onValueChange={(value) =>
                                                        setData(
                                                            'id_kategori',
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih kategori" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {kategoris.map(
                                                            (kat) => (
                                                                <SelectItem
                                                                    key={kat.id}
                                                                    value={String(
                                                                        kat.id,
                                                                    )}
                                                                >
                                                                    {kat.nama}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                {errors.id_kategori && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.id_kategori}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Gambar */}
                                            <div className="space-y-2">
                                                <Label htmlFor="image">
                                                    Gambar Menu
                                                </Label>
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        handleImageChange(e)
                                                    }
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
                                                {errors.gambar && (
                                                    <p className="text-sm text-destructive">
                                                        {errors.gambar}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Tombol */}
                                            <div className="flex gap-2 pt-4">
                                                <Button
                                                    type="submit"
                                                    className="flex-1"
                                                    disabled={processing}
                                                >
                                                    {processing
                                                        ? 'Menyimpan...'
                                                        : 'Simpan'}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() =>
                                                        setIsDialogOpen(false)
                                                    }
                                                >
                                                    Batal
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="makanan" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
                                {/* Gunakan nama dari data kategori */}
                                {kategoris.map((kat) => (
                                    <TabsTrigger
                                        key={kat.id}
                                        value={kat.nama.toLowerCase()}
                                    >
                                        {kat.nama}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            {/* Render content berdasarkan kategori */}
                            {kategoris.map((kat) => (
                                <TabsContent
                                    key={kat.id}
                                    value={kat.nama.toLowerCase()}
                                    className="mt-6"
                                >
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                        {filterItems(
                                            kat.nama.toLowerCase(),
                                        ).map((item) => (
                                            <MenuCard
                                                key={item.id}
                                                item={item}
                                            />
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* ====================== */}
                {/* DIALOG EDIT MENU */}
                {/* ====================== */}
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (!open) {
                            resetEditForm();
                            setEditPreviewImage(null);
                            setSelectedMenu(null);
                        }
                    }}
                >
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Edit Menu</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditMenu} className="space-y-4">
                            {/* Nama Menu */}
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Nama Menu</Label>
                                <Input
                                    id="edit-name"
                                    placeholder="Masukkan harga (cth: 25000)"
                                    value={editData.nama_menu}
                                    onChange={(e) =>
                                        setEditData('nama_menu', e.target.value)
                                    }
                                />
                                {editErrors.nama_menu && (
                                    <p className="text-sm text-destructive">
                                        {editErrors.nama_menu}
                                    </p>
                                )}
                            </div>

                            {/* Harga */}
                            <div className="space-y-2">
                                <Label htmlFor="edit-harga">Harga</Label>
                                <Input
                                    id="edit-harga"
                                    type="number"
                                    placeholder="25000"
                                    value={editData.harga}
                                    onChange={(e) =>
                                        setEditData('harga', e.target.value)
                                    }
                                />
                                {editErrors.harga && (
                                    <p className="text-sm text-destructive">
                                        {editErrors.harga}
                                    </p>
                                )}
                            </div>

                            {/* Stok */}
                            <div className="space-y-2">
                                <Label htmlFor="edit-stok">Stok</Label>
                                <Input
                                    id="edit-stok"
                                    type="number"
                                    placeholder="Masukkan jumlah stok (cth: 12)"
                                    value={editData.stok}
                                    onChange={(e) =>
                                        setEditData('stok', e.target.value)
                                    }
                                />
                                {editErrors.stok && (
                                    <p className="text-sm text-destructive">
                                        {editErrors.stok}
                                    </p>
                                )}
                            </div>

                            {/* Kategori */}
                            <div className="space-y-2">
                                <Label htmlFor="edit-kategori">Kategori</Label>
                                <Select
                                    value={editData.id_kategori}
                                    onValueChange={(value) =>
                                        setEditData('id_kategori', value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kategori" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {kategoris.map((kat) => (
                                            <SelectItem
                                                key={kat.id}
                                                value={String(kat.id)}
                                            >
                                                {kat.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {editErrors.id_kategori && (
                                    <p className="text-sm text-destructive">
                                        {editErrors.id_kategori}
                                    </p>
                                )}
                            </div>

                            {/* Gambar */}
                            <div className="space-y-2">
                                <Label htmlFor="edit-image">
                                    Ganti Gambar Menu (Opsional)
                                </Label>
                                <div className="mb-4 overflow-hidden rounded-md border">
                                    <img
                                        src={
                                            editPreviewImage // Tampilkan preview jika ada, jika tidak, gambar lama
                                                ? editPreviewImage
                                                : selectedMenu
                                                  ? `/storage/${selectedMenu.gambar}`
                                                  : undefined
                                        }
                                        alt={selectedMenu?.nama_menu}
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
                                {editErrors.gambar && (
                                    <p className="text-sm text-destructive">
                                        {editErrors.gambar}
                                    </p>
                                )}
                            </div>

                            {/* Tombol */}
                            <div className="flex gap-2 pt-4">
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    disabled={updateProcessing}
                                >
                                    {updateProcessing
                                        ? 'Menyimpan...'
                                        : 'Simpan'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsEditDialogOpen(false)}
                                >
                                    Batal
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* ====================== */}
                {/* DIALOG DELETE MENU */}
                {/* ====================== */}
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
                                    {selectedMenu?.nama_menu}
                                </span>
                                ? Tindakan ini tidak dapat dibatalkan.
                            </p>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={handleDeleteMenu}
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
