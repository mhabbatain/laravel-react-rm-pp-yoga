import MainContainer from '@/components/main-container';
import MenuCard from '@/components/menu-card';
import OrderPanel from '@/components/order-panel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import pos from '@/routes/pos';
import { BreadcrumbItem, MenuItem, OrderItem, SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Coffee, PlusCircle, UtensilsCrossed } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'POS',
        href: pos.index().url,
    },
];

const categoryIcons: Record<string, React.ElementType> = {
    makanan: UtensilsCrossed,
    minuman: Coffee,
    tambahan: PlusCircle,
};

export default function POS() {
    // DATA
    const { kategoris, menuItems, flash, auth } = usePage<SharedData>().props;
    const karyawanId = auth.user?.karyawan?.id;
    const userId = auth.user?.id;
    const isAdmin = auth.user?.role === 'admin';

    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [activeCategory, setActiveCategory] = useState<
        'makanan' | 'minuman' | 'tambahan'
    >('makanan');

    useEffect(() => {
        // Tampilkan toast sukses jika ada flash success
        if (flash?.success) {
            toast.success(flash.success, {
                style: {
                    // Style sukses (opsional, bisa disamakan)
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    border: '1px solid #22c55e',
                },
                icon: '✅',
            });
        }

        // Tampilkan toast error jika ada flash error (termasuk "Stok Habis")
        if (flash?.error) {
            toast.error(flash.error, {
                // Pesan error diambil langsung dari backend
                style: {
                    // Style error (opsional, bisa disamakan)
                    backgroundColor: '#fca5a5',
                    color: '#991b1b',
                    border: '1px solid #ef4444',
                },
                icon: '❌',
            });
        }
        // Reset flash messages agar tidak muncul lagi saat navigasi (Inertia kadang menyimpannya)
        // Ini mungkin tidak perlu tergantung setup Inertia Anda, tapi bisa membantu
        // router.replace(window.location.pathname, { data: {}, replace: true, preserveState: true, preserveScroll: true });
    }, [flash]); // Jalankan efek ini setiap kali objek flash berubah

    const handleSelectItem = (item: MenuItem) => {
        const existingOrder = orders.find((order) => order.id === item.id);

        if (existingOrder) {
            setOrders(orders.filter((order) => order.id !== item.id));
            // toast.info(`${item.nama_menu} dihapus dari pesanan`);
        } else {
            setOrders([...orders, { ...item, quantity: 1 }]);
            toast.success(`${item.nama_menu} ditambahkan ke pesanan`, {
                style: {
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    border: '1px solid #22c55e',
                },
                icon: '✅',
            });
        }
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        setOrders(
            orders.map((order) =>
                order.id === id ? { ...order, quantity } : order,
            ),
        );
    };

    const handleRemoveItem = (id: number) => {
        const item = orders.find((order) => order.id === id);
        setOrders(orders.filter((order) => order.id !== id));
        if (item) {
            toast.info(`${item.nama_menu} dihapus dari pesanan`, {
                style: {
                    backgroundColor: '#fca5a5',
                    color: '#991b1b',
                    border: '1px solid #ef4444',
                },
            });
        }
    };

    const handleReset = () => {
        setOrders([]);
        toast.info('Pesanan direset');
    };

    const handlePay = (meja: string, metodePembayaran: string) => {
        if (orders.length === 0) {
            toast.error('Belum ada pesanan');
            return;
        }

        // Admin bisa tanpa karyawan, tapi karyawan harus punya id_karyawan
        if (!isAdmin && !karyawanId) {
            toast.error(
                'Akun Anda tidak terhubung dengan data karyawan. Hubungi admin.',
                {
                    style: {
                        backgroundColor: '#fca5a5',
                        color: '#991b1b',
                        border: '1px solid #ef4444',
                    },
                    icon: '❌',
                },
            );
            return;
        }

        const total = orders.reduce(
            (sum, item) => sum + item.harga * item.quantity,
            0,
        );

        // Siapkan data untuk dikirim ke backend
        const payload = {
            id_karyawan: karyawanId || null,
            id_user: isAdmin ? userId : null,
            meja: meja,
            metode_pembayaran: metodePembayaran,
            detail_pesanans: orders.map((item) => ({
                id_menu: item.id,
                jumlah: item.quantity,
                subtotal: item.harga * item.quantity,
            })),
        };

        router.post('/pos', payload, {
            onSuccess: () => {
                toast.success(
                    `Pesanan berhasil disimpan (Total Rp ${total.toLocaleString('id-ID')})`,
                    {
                        style: {
                            backgroundColor: '#dcfce7',
                            color: '#166534',
                            border: '1px solid #22c55e',
                        },
                        icon: '✅',
                    },
                );
                setOrders([]);
            },
            onError: (errors) => {
                console.error(errors);
                toast.error('Gagal menyimpan pesanan', {
                    style: {
                        backgroundColor: '#fca5a5',
                        color: '#991b1b',
                        border: '1px solid #ef4444',
                    },
                    icon: '❌',
                });
            },
        });
    };

    const isItemSelected = (id: number) =>
        orders.some((order) => order.id === id);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="POS" />
            <MainContainer>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Sistem POS Rumah Makan Riak Danau
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
                                    {kategoris?.map((kat) => {
                                        const key = kat.nama?.toLowerCase();
                                        const Icon =
                                            categoryIcons[key] ||
                                            UtensilsCrossed;

                                        return (
                                            <TabsTrigger
                                                key={kat.id}
                                                value={key}
                                                className="flex items-center gap-2 py-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                            >
                                                <Icon className="h-5 w-5" />
                                                {kat.nama}
                                            </TabsTrigger>
                                        );
                                    })}
                                </TabsList>

                                {kategoris.map((kat) => {
                                    const filteredItems = menuItems?.filter(
                                        (item) =>
                                            item.kategori?.nama?.toLowerCase() ===
                                            kat.nama.toLowerCase(),
                                    );

                                    return (
                                        <TabsContent
                                            key={kat.id}
                                            value={kat.nama.toLowerCase()}
                                            className="mt-0 flex-1 overflow-y-auto"
                                        >
                                            <div className="grid grid-cols-2 gap-4 p-2 pb-6 md:grid-cols-3">
                                                {filteredItems?.map((item) => (
                                                    <MenuCard
                                                        key={item.id}
                                                        item={item}
                                                        isSelected={isItemSelected(
                                                            item.id,
                                                        )}
                                                        onSelect={
                                                            handleSelectItem
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        </TabsContent>
                                    );
                                })}
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
