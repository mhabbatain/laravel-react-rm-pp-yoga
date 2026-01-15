import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

interface CreateKaryawanDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (open: boolean) => void;
    formData: {
        nama: string;
        jabatan: 'kasir' | 'pelayan' | 'koki' | 'manajer';
        no_telepon: string;
        email?: string;
        password?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (field: 'jabatan', value: string) => void;
    handleAddKaryawan: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateKaryawanDialog({
    isDialogOpen,
    setIsDialogOpen,
    formData,
    handleChange,
    handleSelectChange,
    handleAddKaryawan,
}: CreateKaryawanDialogProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Karyawan
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Karyawan Baru</DialogTitle>
                    <DialogDescription>
                        Isi data karyawan baru dan kredensial login.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleAddKaryawan} className="space-y-4">
                    {/* Nama */}
                    <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input
                            id="nama"
                            name="nama"
                            placeholder="Masukkan nama lengkap"
                            value={formData.nama}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Jabatan */}
                    <div className="space-y-2">
                        <Label htmlFor="jabatan">Jabatan</Label>
                        <Select
                            value={formData.jabatan}
                            onValueChange={(value) =>
                                handleSelectChange('jabatan', value)
                            }
                        >
                            <SelectTrigger id="jabatan">
                                <SelectValue placeholder="Pilih jabatan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kasir">Kasir</SelectItem>
                                <SelectItem value="pelayan">Pelayan</SelectItem>
                                <SelectItem value="koki">Koki</SelectItem>
                                <SelectItem value="manajer">Manajer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Nomor Telepon */}
                    <div className="space-y-2">
                        <Label htmlFor="no_telepon">Nomor Telepon</Label>
                        <Input
                            id="no_telepon"
                            name="no_telepon"
                            placeholder="Masukkan nomor telepon"
                            value={formData.no_telepon}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Login</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="contoh@domain.local"
                            value={formData.email || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Minimal 8 karakter"
                            value={formData.password || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* status removed */}

                    {/* Tombol Aksi */}
                    <div className="flex gap-2 pt-4">
                        <Button type="submit" className="flex-1">
                            Simpan
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Batal
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
