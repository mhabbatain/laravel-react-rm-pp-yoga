import MainContainer from '@/components/main-container';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import karyawan from '@/routes/karyawan';
import {
    BreadcrumbItem,
    EnumJabatan,
    EnumStatusKaryawan,
    Karyawan as Karyawans,
    SharedData,
} from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Karyawan',
        href: karyawan.index().url,
    },
];

export default function Karyawan() {
    const { karyawans } = usePage<SharedData>().props;

    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedKaryawan, setSelectedKaryawan] = useState<Karyawans | null>(
        null,
    );

    const filteredKaryawans = karyawans.filter(
        (karyawan) =>
            karyawan.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            karyawan.jabatan.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getStatusColor = (status: string) => {
        return status === 'Aktif'
            ? 'bg-success text-success-foreground'
            : 'bg-muted text-muted-foreground';
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Karyawan" />
            <MainContainer>
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Manajemen Karyawan
                    </h1>
                    <p className="text-muted-foreground">
                        Kelola data karyawan rumah makan
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <CardTitle>Daftar Karyawan</CardTitle>
                            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="Cari nama atau jabatan..."
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
                                            Tambah Karyawan
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Tambah Karyawan Baru
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Nama Lengkap
                                                </Label>
                                                <Input
                                                    id="name"
                                                    placeholder="Masukkan nama lengkap"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="position">
                                                    Jabatan
                                                </Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih jabatan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="kasir">
                                                            Kasir
                                                        </SelectItem>
                                                        <SelectItem value="pelayan">
                                                            Pelayan
                                                        </SelectItem>
                                                        <SelectItem value="koki">
                                                            Koki
                                                        </SelectItem>
                                                        <SelectItem value="manajer">
                                                            Manajer
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">
                                                    Nomor Telepon
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    placeholder="081234567890"
                                                />
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
                                                        <SelectItem value="aktif">
                                                            Aktif
                                                        </SelectItem>
                                                        <SelectItem value="nonaktif">
                                                            Nonaktif
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
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Lengkap</TableHead>
                                    <TableHead>Jabatan</TableHead>
                                    <TableHead>Nomor Telepon</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredKaryawans.map((karyawan) => (
                                    <TableRow key={karyawan.id}>
                                        <TableCell className="font-medium">
                                            {karyawan.nama}
                                        </TableCell>
                                        <TableCell>
                                            {karyawan.jabatan}
                                        </TableCell>
                                        <TableCell>
                                            {karyawan.no_telepon}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={getStatusColor(
                                                    karyawan.status,
                                                )}
                                            >
                                                {karyawan.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        setSelectedKaryawan(
                                                            karyawan,
                                                        );
                                                        setIsEditDialogOpen(
                                                            true,
                                                        );
                                                    }}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        setSelectedKaryawan(
                                                            karyawan,
                                                        );
                                                        setIsDeleteDialogOpen(
                                                            true,
                                                        );
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Modal Edit */}
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Data Karyawan</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-name">Nama Lengkap</Label>
                                <Input
                                    id="edit-name"
                                    placeholder="Masukkan nama lengkap"
                                    value={selectedKaryawan?.nama}
                                    onChange={(e) =>
                                        setSelectedKaryawan(
                                            selectedKaryawan
                                                ? {
                                                      ...selectedKaryawan,
                                                      nama: e.target.value,
                                                  }
                                                : null,
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-position">Jabatan</Label>
                                <Select
                                    value={selectedKaryawan?.jabatan.toLowerCase()}
                                    onValueChange={(value) =>
                                        setSelectedKaryawan(
                                            selectedKaryawan
                                                ? {
                                                      ...selectedKaryawan,
                                                      jabatan: (value
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                          value.slice(
                                                              1,
                                                          )) as EnumJabatan,
                                                  }
                                                : null,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jabatan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kasir">
                                            Kasir
                                        </SelectItem>
                                        <SelectItem value="pelayan">
                                            Pelayan
                                        </SelectItem>
                                        <SelectItem value="koki">
                                            Koki
                                        </SelectItem>
                                        <SelectItem value="manajer">
                                            Manajer
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-phone">
                                    Nomor Telepon
                                </Label>
                                <Input
                                    id="edit-phone"
                                    placeholder="081234567890"
                                    value={selectedKaryawan?.no_telepon}
                                    onChange={(e) =>
                                        setSelectedKaryawan(
                                            selectedKaryawan
                                                ? {
                                                      ...selectedKaryawan,
                                                      no_telepon:
                                                          e.target.value,
                                                  }
                                                : null,
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-status">Status</Label>
                                <Select
                                    value={selectedKaryawan?.status.toLowerCase()}
                                    onValueChange={(value) =>
                                        setSelectedKaryawan(
                                            selectedKaryawan
                                                ? {
                                                      ...selectedKaryawan,
                                                      status: (value
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                          value.slice(
                                                              1,
                                                          )) as EnumStatusKaryawan,
                                                  }
                                                : null,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="aktif">
                                            Aktif
                                        </SelectItem>
                                        <SelectItem value="nonaktif">
                                            Nonaktif
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button
                                    className="flex-1"
                                    onClick={() => {
                                        // Handle update logic here
                                        setIsEditDialogOpen(false);
                                    }}
                                >
                                    Simpan
                                </Button>
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsEditDialogOpen(false)}
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
                                Apakah Anda yakin ingin menghapus data karyawan{' '}
                                <span className="font-semibold">
                                    {selectedKaryawan?.nama}
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
