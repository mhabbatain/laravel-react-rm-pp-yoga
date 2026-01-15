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
    pesanans?: Pesanan[];
    pesanan?: Pesanan;
    stats?: Array<{ title: string; value: string }>;
    recentOrders?: Array<RecentOrderItem>;
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'karyawan';
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
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

export interface Karyawan {
    id: number;
    nama: string;
    jabatan: EnumJabatan;
    no_telepon: string;
    pesanans?: Pesanan[];
}

export interface Pesanan {
    id: number;
    meja: EnumNomorMeja;
    nomor_pesanan: string;
    waktu: string;
    total: number;
    metode_pembayaran: EnumMetodePembayaran;
    karyawan?: Karyawan;
    created_at: string;
    updated_at: string;
    detail_pesanans?: DetailPesanan[];
}

export interface DetailPesanan {
    id: number;
    pesanan?: Pesanan;
    menu?: MenuItem;
    jumlah: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
}

// POST KARYAWAN
export interface AddKaryawanPayload {
    nama: string;
    jabatan: 'kasir' | 'pelayan' | 'koki' | 'manajer';
    no_telepon: string;
    email: string;
    password: string;
    [key: string]: string | undefined;
}

// PUT KARYAWAN
export interface UpdateKaryawanPayload {
    nama: string;
    jabatan: 'kasir' | 'pelayan' | 'koki' | 'manajer';
    no_telepon: string;
}

export interface KaryawanFormData {
    nama: string;
    jabatan: 'kasir' | 'pelayan' | 'koki' | 'manajer';
    no_telepon: string;
    email?: string;
    password?: string;
    [key: string]: string | undefined;
}

// ENUM KARYAWAN
export enum EnumJabatan {
    Kasir = 'kasir',
    Pelayan = 'pelayan',
    Koki = 'koki',
    Manajer = 'manajer',
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
