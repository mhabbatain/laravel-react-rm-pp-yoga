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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

export interface EditKaryawanDialogProps {
    isEditDialogOpen: boolean;
    setIsEditDialogOpen: (open: boolean) => void;
    formData: {
        nama: string;
        jabatan: 'kasir' | 'pelayan' | 'koki' | 'manajer';
        no_telepon: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (field: 'jabatan', value: string) => void;
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

                    {/* Jabatan */}
                    <div className="space-y-2">
                        <Label htmlFor="edit-jabatan">Jabatan</Label>
                        <Select
                            value={formData.jabatan}
                            onValueChange={(value) =>
                                handleSelectChange('jabatan', value)
                            }
                        >
                            <SelectTrigger id="edit-jabatan">
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
