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
        const data = new FormData(form);
        const payload = {
            nama: (data.get('nama') as string) || '',
            jabatan: (data.get('jabatan') as string) || '',
            no_telepon: (data.get('no_telepon') as string) || '',
            email: (data.get('email') as string) || '',
            password: (data.get('password') as string) || '',
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

            <label htmlFor="jabatan" className="sr-only">
                Jabatan
            </label>
            <select
                id="jabatan"
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

            <input
                name="email"
                type="email"
                placeholder="Email login"
                className="w-full rounded border p-2"
                required
            />

            <input
                name="password"
                type="password"
                placeholder="Password (min 8)"
                className="w-full rounded border p-2"
                required
            />

            <button
                type="submit"
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Simpan
            </button>
        </form>
    );
}
