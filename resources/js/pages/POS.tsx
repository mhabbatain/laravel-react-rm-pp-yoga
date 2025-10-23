import MainContainer from '@/components/main-container';
import MenuCard from '@/components/menu-card';
import OrderPanel from '@/components/order-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { menuItems } from '@/data/menuData';
import AppLayout from '@/layouts/app-layout';
import { pos } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { MenuItem, OrderItem } from '@/types/menu';
import { Head } from '@inertiajs/react';
import { Coffee, Plus, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS',
        href: pos().url,
    },
];

export default function POS() {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<
        'makanan' | 'minuman' | 'tambahan'
    >('makanan');

    const handleSelectItem = (item: MenuItem) => {
        const existingOrder = orders.find((order) => order.id === item.id);

        if (existingOrder) {
            setOrders(orders.filter((order) => order.id !== item.id));
            toast.info(`${item.name} dihapus dari pesanan`);
        } else {
            setOrders([...orders, { ...item, quantity: 1 }]);
            toast.success(`${item.name} ditambahkan ke pesanan`);
        }
    };

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, quantity } : order,
            ),
        );
    };

    const handleRemoveItem = (id: string) => {
        const item = orders.find((order) => order.id === id);
        setOrders(orders.filter((order) => order.id !== id));
        if (item) {
            toast.info(`${item.name} dihapus dari pesanan`);
        }
    };

    const handleReset = () => {
        setOrders([]);
        toast.info('Pesanan direset');
    };

    const handlePay = () => {
        const total = orders.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
        );
        toast.success(
            `Pembayaran sebesar Rp ${total.toLocaleString('id-ID')} berhasil!`,
        );
        setOrders([]);
    };

    const filteredItems = menuItems.filter(
        (item) => item.category === activeCategory,
    );
    const isItemSelected = (id: string) =>
        orders.some((order) => order.id === id);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <MainContainer>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Sistem POS Rumah Makan PP Yoga
                        </h1>
                        <p className="text-muted-foreground">
                            Muaro Bulian, Jambi
                        </p>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="grid h-[calc(100vh-140px)] grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Menu Section */}
                        <div className="flex flex-col lg:col-span-2">
                            <Tabs
                                value={activeCategory}
                                onValueChange={(v) =>
                                    setActiveCategory(
                                        v as 'makanan' | 'minuman' | 'tambahan',
                                    )
                                }
                                className="flex flex-1 flex-col"
                            >
                                <TabsList className="mb-6 grid h-auto w-full grid-cols-3 p-1">
                                    <TabsTrigger
                                        value="makanan"
                                        className="flex items-center gap-2 py-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <UtensilsCrossed className="h-5 w-5" />
                                        Makanan
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="minuman"
                                        className="flex items-center gap-2 py-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Coffee className="h-5 w-5" />
                                        Minuman
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="tambahan"
                                        className="flex items-center gap-2 py-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        <Plus className="h-5 w-5" />
                                        Tambahan
                                    </TabsTrigger>
                                </TabsList>

                                {(
                                    ['makanan', 'minuman', 'tambahan'] as const
                                ).map((category) => (
                                    <TabsContent
                                        key={category}
                                        value={category}
                                        className="mt-0 flex-1 overflow-y-auto"
                                    >
                                        <div className="grid grid-cols-2 gap-4 p-2 pb-6 md:grid-cols-3">
                                            {filteredItems.map((item) => (
                                                <MenuCard
                                                    key={item.id}
                                                    item={item}
                                                    isSelected={isItemSelected(
                                                        item.id,
                                                    )}
                                                    onSelect={handleSelectItem}
                                                />
                                            ))}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </div>

                        {/* Order Panel */}
                        <div className="lg:col-span-1">
                            <OrderPanel
                                orders={orders}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveItem={handleRemoveItem}
                                onReset={handleReset}
                                onPay={handlePay}
                            />
                        </div>
                    </div>
                </div>
            </MainContainer>
        </AppLayout>
    );
}
