export interface MenuItem {
    id: string;
    name: string;
    price: number;
    image: string;
    category: 'makanan' | 'minuman' | 'tambahan';
    stok: number;
}

export interface OrderItem extends MenuItem {
    quantity: number;
}
