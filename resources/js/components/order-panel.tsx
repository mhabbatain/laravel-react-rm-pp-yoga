import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { OrderItem } from '@/types/menu';
import { CreditCard, Minus, Plus, RotateCcw, Trash2 } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './ui/select';

interface OrderPanelProps {
    orders: OrderItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onReset: () => void;
    onPay: () => void;
}

export default function OrderPanel({
    orders,
    onUpdateQuantity,
    onRemoveItem,
    onReset,
    onPay,
}: OrderPanelProps) {
    const total = orders.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    return (
        <Card className="flex h-full flex-col shadow-lg">
            <div className="border-b bg-linear-to-br from-primary/5 to-transparent p-6">
                <h2 className="text-2xl font-bold text-foreground">
                    Nota Pesanan
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {orders.length} item dipilih
                </p>
            </div>

            <ScrollArea className="flex-1 p-4">
                {orders.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                            <CreditCard className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Belum ada pesanan
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Pilih menu untuk memulai
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {orders.map((item) => (
                            <Card
                                key={item.id}
                                className="border p-4 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <h3 className="mb-1 truncate font-semibold text-foreground">
                                            {item.name}
                                        </h3>
                                        <p className="text-sm font-medium text-primary">
                                            Rp{' '}
                                            {item.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="mt-3 flex items-center justify-between border-t pt-3">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8 rounded-full"
                                            onClick={() =>
                                                onUpdateQuantity(
                                                    item.id,
                                                    Math.max(
                                                        1,
                                                        item.quantity - 1,
                                                    ),
                                                )
                                            }
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>

                                        <span className="w-12 text-center text-lg font-semibold">
                                            {item.quantity}
                                        </span>

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8 rounded-full"
                                            onClick={() =>
                                                onUpdateQuantity(
                                                    item.id,
                                                    item.quantity + 1,
                                                )
                                            }
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>

                                    <span className="text-lg font-bold text-foreground">
                                        Rp{' '}
                                        {(
                                            item.price * item.quantity
                                        ).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </ScrollArea>

            {orders.length > 0 && (
                <>
                    <Separator />

                    <div className="space-y-4 bg-linear-to-br from-primary/5 to-transparent p-6">
                        <div className="flex items-center justify-between text-2xl font-bold">
                            <span className="text-foreground">Total</span>
                            <span className="text-primary">
                                Rp {total.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Metode Pembayaran" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Pilih metode pembayaran
                                        </SelectLabel>
                                        <SelectItem value="cash">
                                            Cash
                                        </SelectItem>
                                        <SelectItem value="qris">
                                            QRIS
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Nomor Meja" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Pilih nomor meja
                                        </SelectLabel>
                                        {[
                                            '1',
                                            '2',
                                            '3',
                                            '4',
                                            '5',
                                            '6',
                                            '7',
                                        ].map((item) => (
                                            <SelectItem value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={onReset}
                            >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>

                            <Button
                                className="w-full transition-opacity hover:opacity-90"
                                onClick={onPay}
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Bayar
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
}
