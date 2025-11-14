import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MenuItem } from '@/types';
import { Check, Plus } from 'lucide-react';

interface MenuCardProps {
    item: MenuItem;
    isSelected: boolean;
    onSelect: (item: MenuItem) => void;
}

export default function MenuCard({
    item,
    isSelected,
    onSelect,
}: MenuCardProps) {
    return (
        <Card
            className={`relative cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isSelected ? 'shadow-md ring-2 ring-primary' : ''
            }`}
            onClick={() => onSelect(item)}
        >
            <div className="aspect-4/3 overflow-hidden bg-muted">
                <img
                    src={item.gambar}
                    alt={item.nama_menu}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {item.nama_menu}
                </h3>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-primary">
                        Rp {item.harga.toLocaleString('id-ID')}
                    </span>

                    <Button
                        size="icon"
                        variant={isSelected ? 'default' : 'secondary'}
                        className="rounded-full transition-all"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(item);
                        }}
                    >
                        {isSelected ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Plus className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Stok: {item.stok}
                </p>
            </div>
        </Card>
    );
}
