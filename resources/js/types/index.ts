import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    isAdminOnly?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    kategoris: Kategori[];
    menuItems: MenuItem[];
    karyawans: Karyawan[];
    transaksis?: Transaksi[];
    transaksi?: Transaksi;
    currentFilter?: string;
    stats?: Array<{ title: string; value: string }>;
    recentOrders?: Array<RecentOrderItem>;
    flash?: {
        success?: string;
        error?: string;
        transaksi_id?: number;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'karyawan' | 'kasir';
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    menu?: MenuItem;
    karyawan?: Karyawan;
}

export interface Karyawan {
    id: number;
    nama: string;
    role: string;
    no_telepon: string;
    email?: string;
    transaksis?: Transaksi[];
}

export interface Transaksi {
    id: number;
    nomor_pesanan: string;
    id_karyawan?: number;
    id_user?: number;
    meja: string; // EnumNomorMeja string value
    waktu: string;
    total: number;
    metode_pembayaran: EnumMetodePembayaran;
    status: 'pending' | 'selesai' | 'batal';
    created_at: string;
    updated_at: string;
    karyawan?: Karyawan;
    user?: User;
    detail_transaksis?: DetailTransaksi[];
}

interface RecentOrderItem {
    id: string | number; // ID bisa number atau string tergantung tabel
    total: number;
    nomor_pesanan: string;
}

export interface Kategori {
    id: number;
    nama: string;
}

export interface MenuItem {
    id: number;
    nama_menu: string;
    harga: number;
    gambar: string;
    stok: number;
    id_kategori: number;
    kategori?: Kategori;
}

export interface OrderItem extends MenuItem {
    quantity: number;
}

export interface DetailTransaksi {
    id: number;
    id_transaksi: number;
    id_menu: number;
    jumlah: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
    menu?: MenuItem;
}

// POST KARYAWAN
export interface AddKaryawanPayload {
    nama: string;
    role: string;
    no_telepon: string;
    email: string;
    password: string;
    [key: string]: string | undefined;
}

// PUT KARYAWAN
export interface UpdateKaryawanPayload {
    nama: string;
    role: string;
    no_telepon: string;
    email: string;
    password?: string;
}

export interface KaryawanFormData {
    nama: string;
    role: string;
    no_telepon: string;
    email?: string;
    password?: string;
    [key: string]: string | undefined;
}

// ENUM KARYAWAN
export enum EnumRole {
    Kasir = 'kasir',
}

// ENUM PESANAN
export enum EnumNomorMeja {
    Satu = '1',
    Dua = '2',
    Tiga = '3',
    Empat = '4',
    Lima = '5',
    Enam = '6',
    Tujuh = '7',
}

export enum EnumMetodePembayaran {
    Tunai = 'tunai',
    Qris = 'qris',
}
