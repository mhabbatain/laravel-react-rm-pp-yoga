import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Karyawan } from '@/types';
import { MouseEvent } from 'react';
import { Button } from './ui/button';

export interface DeleteKaryawanDialogProps {
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    selectedKaryawan: Karyawan | null;
    setSelectedKaryawan: (karyawan: Karyawan | null) => void;
    handleDeleteKaryawan: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function DeleteKaryawanDialog({
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedKaryawan,
    handleDeleteKaryawan,
}: DeleteKaryawanDialogProps) {
    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                </DialogHeader>
                <p>
                    Apakah Anda yakin ingin menghapus karyawan{' '}
                    <strong>{selectedKaryawan?.nama}</strong>?
                </p>
                <div className="flex gap-2 pt-4">
                    <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={handleDeleteKaryawan}
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
            </DialogContent>
        </Dialog>
    );
}
