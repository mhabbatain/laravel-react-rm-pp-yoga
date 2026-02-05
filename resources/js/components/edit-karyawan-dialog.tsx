import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export interface EditKaryawanDialogProps {
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    formData: {
        nama: string;
        role: string;
        no_telepon: string;
        email?: string;
        password?: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (field: 'role', value: string) => void;
    handleEditKaryawan: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function EditKaryawanDialog({
    isEditDialogOpen,
    setIsEditDialogOpen,
    formData,
    handleChange,
    handleSelectChange,
    handleEditKaryawan,
}: EditKaryawanDialogProps) {
    return (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Data Karyawan</DialogTitle>
                    <DialogDescription>
                        Ubah informasi karyawan sesuai kebutuhan.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleEditKaryawan} className="space-y-4">
                    {/* Nama */}
                    <div className="space-y-2">
                        <Label htmlFor="edit-nama">Nama Lengkap</Label>
                        <Input
                            id="edit-nama"
                            name="nama"
                            placeholder="Masukkan nama lengkap"
                            value={formData.nama}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Role (Hidden) */}
                    <input type="hidden" name="role" value="kasir" />

                    {/* Nomor Telepon */}
                    <div className="space-y-2">
                        <Label htmlFor="edit-no_telepon">Nomor Telepon</Label>
                        <Input
                            id="edit-no_telepon"
                            name="no_telepon"
                            placeholder="Masukkan nomor telepon"
                            value={formData.no_telepon}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                            id="edit-email"
                            name="email"
                            type="email"
                            placeholder="Masukkan email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="edit-password">
                            Password (Kosongkan jika tidak ingin mengubah)
                        </Label>
                        <Input
                            id="edit-password"
                            name="password"
                            type="password"
                            placeholder="Masukkan password baru"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {/* status removed */}

                    {/* Tombol */}
                    <div className="flex gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsEditDialogOpen(false)}
                        >
                            Batal
                        </Button>
                        <Button type="submit" className="flex-1">
                            Simpan
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
