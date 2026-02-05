import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { OrderItem } from '@/types';
import { CreditCard, Minus, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
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
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
    onReset: () => void;
    onPay: (meja: string, metodePembayaran: string) => void;
}

export default function OrderPanel({
    orders,
    onUpdateQuantity,
    onRemoveItem,
    onReset,
    onPay,
}: OrderPanelProps) {
    const [selectedPayment, setSelectedPayment] = useState('tunai');
    const [selectedTable, setSelectedTable] = useState('1');
    const [showPaymentPanel, setShowPaymentPanel] = useState(false);
    const [amountGiven, setAmountGiven] = useState<number | ''>('');

    const total = orders.reduce(
        (sum, item) => sum + item.harga * item.quantity,
        0,
    );
    return (
        <Card className="flex h-[calc(100vh-12rem)] md:h-[calc(100vh-9rem)] flex-col overflow-hidden shadow-lg">
            <div className="shrink-0 border-b bg-linear-to-br from-primary/5 to-transparent p-4 md:p-6">
                <h2 className="text-xl font-bold text-foreground md:text-2xl">
                    Nota Pesanan
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    {orders.length} item dipilih
                </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 md:p-4">
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
                                            {item.nama_menu}
                                        </h3>
                                        <p className="mb-1 text-sm font-medium text-primary">
                                            Rp{' '}
                                            {item.harga.toLocaleString('id-ID')}
                                        </p>
                                        {item.quantity >= item.stok && (
                                            <p className="text-sm text-destructive">
                                                Stok Maksimum
                                            </p>
                                        )}
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
                                            className="h-8 w-8 rounded-full disabled:cursor-not-allowed"
                                            disabled={item.quantity == 1}
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
                                            className="h-8 w-8 rounded-full disabled:cursor-not-allowed"
                                            disabled={
                                                item.quantity >= item.stok
                                            }
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
                                            item.harga * item.quantity
                                        ).toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {orders.length > 0 && (
                <div className="mt-auto shrink-0 border-t bg-background p-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:p-4">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xl font-bold md:text-2xl">
                            <span className="text-foreground">Total</span>
                            <span className="text-primary">
                                Rp {total.toLocaleString('id-ID')}
                            </span>
                        </div>

                        {/* Select Payment & Table */}
                        <div className="flex flex-row gap-x-2">
                            <Select
                                onValueChange={setSelectedPayment}
                                defaultValue={selectedPayment}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Metode Pembayaran" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>
                                            Pilih metode pembayaran
                                        </SelectLabel>
                                        <SelectItem value="tunai">
                                            Tunai
                                        </SelectItem>
                                        <SelectItem value="qris">
                                            QRIS
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                onValueChange={setSelectedTable}
                                defaultValue={selectedTable}
                            >
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
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Buttons */}
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
                                onClick={() => setShowPaymentPanel(true)}
                                disabled={!selectedPayment || !selectedTable}
                            >
                                <CreditCard className="mr-2 h-4 w-4" />
                                Bayar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {showPaymentPanel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <Card className="w-full max-w-md rounded-lg p-4 shadow-2xl">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-lg font-bold">Pembayaran</h3>
                            <span className="text-sm text-muted-foreground">
                                Pastikan jumlah sesuai sebelum konfirmasi
                            </span>
                        </div>

                        <div className="mb-4 rounded-md bg-muted/10 p-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Total
                                </span>
                                <div className="rounded-md bg-primary/5 px-3 py-1">
                                    <span className="text-lg font-semibold text-primary">
                                        Rp {total.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="amount_given"
                                    className="mb-1 block text-sm font-medium"
                                >
                                    Jumlah Yang Dibayarkan
                                </label>

                                <input
                                    id="amount_given"
                                    name="amount_given"
                                    type="number"
                                    min={0}
                                    step={1000}
                                    placeholder="0"
                                    title="Jumlah uang yang diberikan oleh pelanggan"
                                    className="w-full rounded-md border p-2 focus:border-primary focus:ring-primary/40"
                                    value={
                                        amountGiven === '' ? '' : amountGiven
                                    }
                                    onChange={(e) => {
                                        setAmountGiven(
                                            e.target.value === ''
                                                ? ''
                                                : Number(e.target.value),
                                        );
                                    }}
                                />
                                
                                {/* Quick amount buttons */}
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full font-bold"
                                        onClick={() => setAmountGiven(total)}
                                    >
                                        Uang Pas
                                    </Button>

                                    {[5000, 10000, 20000, 50000, 100000].map(
                                        (amt) => (
                                            <Button
                                                key={amt}
                                                variant={"outline"}
                                                type="button"
                                                className="flex font-bold items-center justify-center rounded-md border px-3 py-2 text-sm hover:bg-primary/5"
                                                onClick={() => {
                                                    setAmountGiven(amt);
                                                }}
                                            >
                                                Rp {amt.toLocaleString('id-ID')}
                                            </Button>
                                        ),
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Kembalian
                                </span>
                                <span className="font-semibold">
                                    Rp{' '}
                                    {Math.max(
                                        0,
                                        (typeof amountGiven === 'number'
                                            ? amountGiven
                                            : 0) - total,
                                    ).toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-3">
                            <Button
                                variant="outline"
                                className="px-4"
                                onClick={() => {
                                    setShowPaymentPanel(false);
                                    setAmountGiven('');
                                }}
                            >
                                Batal
                            </Button>

                            <Button
                                className="bg-primary px-4 text-primary-foreground"
                                onClick={() => {
                                    onPay(selectedTable, selectedPayment);
                                    setShowPaymentPanel(false);
                                    setAmountGiven('');
                                }}
                                disabled={
                                    selectedPayment === 'tunai' &&
                                    (amountGiven === '' ||
                                        (typeof amountGiven === 'number' &&
                                            amountGiven < total))
                                }
                            >
                                Konfirmasi
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </Card>
    );
}
