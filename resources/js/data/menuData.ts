import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
    // Makanan
    {
        id: 'mak-1',
        name: 'Nasi Goreng Special',
        price: 25000,
        image: '/menu/nasi-goreng.jpg',
        category: 'makanan',
    },
    {
        id: 'mak-2',
        name: 'Mie Goreng',
        price: 20000,
        image: '/menu/mie-goreng.jpg',
        category: 'makanan',
    },
    {
        id: 'mak-3',
        name: 'Ayam Geprek',
        price: 22000,
        image: '/menu/ayam-geprek.jpg',
        category: 'makanan',
    },
    {
        id: 'mak-4',
        name: 'Soto Ayam',
        price: 18000,
        image: '/menu/soto-ayam.jpg',
        category: 'makanan',
    },
    {
        id: 'mak-5',
        name: 'Nasi Uduk',
        price: 15000,
        image: '/menu/nasi-uduk.jpg',
        category: 'makanan',
    },
    {
        id: 'mak-6',
        name: 'Gado-Gado',
        price: 17000,
        image: '/menu/gado-gado.jpg',
        category: 'makanan',
    },

    // Minuman
    {
        id: 'min-1',
        name: 'Es Teh Manis',
        price: 5000,
        image: '/menu/es-teh.jpg',
        category: 'minuman',
    },
    {
        id: 'min-2',
        name: 'Es Jeruk',
        price: 7000,
        image: '/menu/es-jeruk.jpg',
        category: 'minuman',
    },
    {
        id: 'min-3',
        name: 'Es Kelapa Muda',
        price: 12000,
        image: '/menu/es-kelapa.jpg',
        category: 'minuman',
    },
    {
        id: 'min-4',
        name: 'Jus Alpukat',
        price: 15000,
        image: '/menu/jus-alpukat.jpg',
        category: 'minuman',
    },
    {
        id: 'min-5',
        name: 'Kopi Hitam',
        price: 8000,
        image: '/menu/kopi-hitam.jpg',
        category: 'minuman',
    },
    {
        id: 'min-6',
        name: 'Teh Poci',
        price: 6000,
        image: '/menu/teh-poci.jpg',
        category: 'minuman',
    },

    // Tambahan
    {
        id: 'tam-1',
        name: 'Kerupuk',
        price: 2000,
        image: '/menu/kerupuk.jpg',
        category: 'tambahan',
    },
    {
        id: 'tam-2',
        name: 'Telur Mata Sapi',
        price: 5000,
        image: '/menu/telur.jpg',
        category: 'tambahan',
    },
    {
        id: 'tam-3',
        name: 'Tempe Goreng',
        price: 3000,
        image: '/menu/tempe.jpg',
        category: 'tambahan',
    },
    {
        id: 'tam-4',
        name: 'Tahu Goreng',
        price: 3000,
        image: '/menu/tahu.jpg',
        category: 'tambahan',
    },
];
