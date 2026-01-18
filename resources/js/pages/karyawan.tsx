import CreateKaryawanDialog from '@/components/create-karyawan-dialog';
import DeleteKaryawanDialog from '@/components/delete-karyawan-dialog';
import EditKaryawanDialog from '@/components/edit-karyawan-dialog';
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
import AppLayout from '@/layouts/app-layout';
import karyawan from '@/routes/karyawan';
import {
    AddKaryawanPayload,
    BreadcrumbItem,
    KaryawanFormData,
    Karyawan as Karyawans,
    SharedData,
} from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Edit, Search, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

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

    const [formData, setFormData] = useState<KaryawanFormData>({
        nama: '',
        jabatan: 'kasir',
        no_telepon: '',
        email: '',
        password: '',
    });

    // 🧠 Handler untuk semua input teks
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const filteredKaryawans = karyawans.filter(
        (karyawan) =>
            karyawan.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            karyawan.jabatan.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // status removed

    const handleSelectChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // ===============================
    //  CREATE Karyawan
    // ===============================
    const handleAddKaryawan = (e: React.FormEvent) => {
        e.preventDefault();

        router.post('/karyawan', formData as AddKaryawanPayload, {
            onSuccess: () => {
                setIsDialogOpen(false);
                setFormData({
                    nama: '',
                    jabatan: 'kasir',
                    no_telepon: '',
                    email: '',
                    password: '',
                });
                toast.success('Karyawan berhasil ditambahkan!', {
                    style: {
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        border: '1px solid #22c55e',
                    },
                    icon: '✅',
                });
            },
            onError: (errors: Record<string, string>) => {
                const errorMessages = Object.values(errors);
                const errorMessage =
                    errorMessages.length > 0
                        ? errorMessages[0]
                        : 'Gagal menambahkan karyawan!';

                toast.error(errorMessage, {
                    style: {
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        border: '1px solid #ef4444',
                    },
                    icon: '❌',
                });
            },
        });
    };

    // ===============================
    //  UPDATE Karyawan
    // ===============================
    const handleEditKaryawan = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedKaryawan) return;

        router.put(`/karyawan/${selectedKaryawan.id}`, formData, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Data karyawan berhasil diperbarui!');
                setIsEditDialogOpen(false);
            },
            onError: () => {
                toast.error('Gagal memperbarui data karyawan!');
            },
        });
    };

    // ===============================
    //  DELETE Karyawan
    // ===============================
    const handleDeleteKaryawan = () => {
        if (!selectedKaryawan) return;

        router.delete(`/karyawan/${selectedKaryawan.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Karyawan berhasil dihapus!');
                setIsDeleteDialogOpen(false);
            },
            onError: () => {
                toast.error('Gagal menghapus karyawan!');
            },
        });
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
                                {/* CREATE KARYAWAN DIALOG */}
                                <CreateKaryawanDialog
                                    isDialogOpen={isDialogOpen}
                                    setIsDialogOpen={setIsDialogOpen}
                                    formData={formData}
                                    handleChange={handleChange}
                                    handleSelectChange={handleSelectChange}
                                    handleAddKaryawan={handleAddKaryawan}
                                />
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
                                            {karyawan.jabatan
                                                .charAt(0)
                                                .toUpperCase() +
                                                karyawan.jabatan.slice(1)}
                                        </TableCell>
                                        <TableCell>
                                            {karyawan.no_telepon}
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
                                                        setFormData({
                                                            nama: karyawan.nama,
                                                            jabatan:
                                                                karyawan.jabatan,
                                                            no_telepon:
                                                                karyawan.no_telepon,
                                                        });
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

                {/* EDIT DIALOG */}
                <EditKaryawanDialog
                    isEditDialogOpen={isEditDialogOpen}
                    setIsEditDialogOpen={setIsEditDialogOpen}
                    formData={formData}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    handleEditKaryawan={handleEditKaryawan}
                />

                {/* DELETE DIALOG */}
                <DeleteKaryawanDialog
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    setIsDeleteDialogOpen={setIsDeleteDialogOpen}
                    selectedKaryawan={selectedKaryawan}
                    setSelectedKaryawan={setSelectedKaryawan}
                    handleDeleteKaryawan={handleDeleteKaryawan}
                />
            </MainContainer>
        </AppLayout>
    );
}
