export type OrderItem = {
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
};

export type Order = {
    id: string;
    orderNumber: string;
    customerName: string;
    orderTime: string;
    status: string;
    total: number;
    itemCount: number;
    items: OrderItem[];
    subtotal: number;
    tax: number;
};

export const orders: Order[] = [
    {
        id: '001',
        orderNumber: 'ORD-2024-001',
        customerName: 'Budi Santoso',
        orderTime: '2024-01-15 14:30',
        status: 'Diproses',
        total: 148500,
        itemCount: 4,
        items: [
            {
                name: 'Nasi Goreng Spesial',
                quantity: 2,
                price: 35000,
                subtotal: 70000,
            },
            { name: 'Es Teh Manis', quantity: 2, price: 5000, subtotal: 10000 },
            {
                name: 'Ayam Goreng Kremes',
                quantity: 1,
                price: 40000,
                subtotal: 40000,
            },
            { name: 'Jus Alpukat', quantity: 1, price: 15000, subtotal: 15000 },
        ],
        subtotal: 135000,
        tax: 13500,
    },
    {
        id: '002',
        orderNumber: 'ORD-2024-002',
        customerName: 'Siti Rahma',
        orderTime: '2024-01-15 15:15',
        status: 'Selesai',
        total: 85000,
        itemCount: 3,
        items: [
            { name: 'Mie Goreng', quantity: 1, price: 30000, subtotal: 30000 },
            { name: 'Es Jeruk', quantity: 1, price: 15000, subtotal: 15000 },
            { name: 'Ayam Bakar', quantity: 1, price: 40000, subtotal: 40000 },
        ],
        subtotal: 85000,
        tax: 8500,
    },
    {
        id: '003',
        orderNumber: 'ORD-2024-003',
        customerName: 'Ahmad Rizki',
        orderTime: '2024-01-15 15:45',
        status: 'Diproses',
        total: 125000,
        itemCount: 5,
        items: [
            { name: 'Nasi Uduk', quantity: 2, price: 20000, subtotal: 40000 },
            { name: 'Soto Ayam', quantity: 1, price: 30000, subtotal: 30000 },
            { name: 'Es Teh', quantity: 2, price: 12500, subtotal: 25000 },
            {
                name: 'Pisang Goreng',
                quantity: 1,
                price: 30000,
                subtotal: 30000,
            },
        ],
        subtotal: 125000,
        tax: 12500,
    },
    {
        id: '004',
        orderNumber: 'ORD-2024-004',
        customerName: 'Dewi Lestari',
        orderTime: '2024-01-15 16:20',
        status: 'Selesai',
        total: 95000,
        itemCount: 2,
        items: [
            { name: 'Nasi Campur', quantity: 1, price: 50000, subtotal: 50000 },
            { name: 'Es Kopi', quantity: 1, price: 45000, subtotal: 45000 },
        ],
        subtotal: 95000,
        tax: 9500,
    },
    {
        id: '005',
        orderNumber: 'ORD-2024-005',
        customerName: 'Joko Widodo',
        orderTime: '2024-01-15 16:50',
        status: 'Dibatalkan',
        total: 75000,
        itemCount: 3,
        items: [
            { name: 'Bakso', quantity: 2, price: 20000, subtotal: 40000 },
            { name: 'Teh Tawar', quantity: 1, price: 35000, subtotal: 35000 },
        ],
        subtotal: 75000,
        tax: 7500,
    },
];

export function getOrderById(id: string) {
    return orders.find((o) => o.id === id);
}
