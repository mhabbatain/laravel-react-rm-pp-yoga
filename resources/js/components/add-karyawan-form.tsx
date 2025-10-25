import { router } from '@inertiajs/react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

interface KaryawanFormProps {
    closeModal: () => void;
}

export default function AddKaryawanForm({ closeModal }: KaryawanFormProps) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const payload = {
            nama: form.nama.value,
            jabatan: form.jabatan.value,
            no_telepon: form.no_telepon.value,
            status: form.status.value,
        };

        router.post('/karyawan', payload, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Karyawan berhasil ditambahkan!');
                closeModal();
            },
            onError: () => {
                toast.error('Gagal menambahkan karyawan!');
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="nama"
                placeholder="Nama"
                className="w-full rounded border p-2"
                required
            />

            <select
                name="jabatan"
                className="w-full rounded border p-2"
                required
            >
                <option value="">Pilih jabatan</option>
                <option value="kasir">Kasir</option>
                <option value="pelayan">Pelayan</option>
                <option value="koki">Koki</option>
                <option value="manajer">Manajer</option>
            </select>

            <input
                name="no_telepon"
                placeholder="No Telepon"
                className="w-full rounded border p-2"
                required
            />

            <select
                name="status"
                className="w-full rounded border p-2"
                required
            >
                <option value="">Pilih status</option>
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
            </select>

            <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Simpan
            </button>
        </form>
    );
}
