"use client";

import { Item, Category } from "@/lib/types";
import ItemCard from "./ItemCard";

interface CategorySectionProps {
  category: Category;
  items: Item[];
  onQuantityChange: (itemId: string, delta: number) => Item | null;
  onSetQuantity: (itemId: string, quantity: number) => void;
  onEditItem: (item: Item) => void;
  onTriggerPurchase: (item: Item) => void;
}

export default function CategorySection({
  category,
  items,
  onQuantityChange,
  onSetQuantity,
  onEditItem,
  onTriggerPurchase,
}: CategorySectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="mb-6">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="text-xl">{category.emoji}</span>
        <h2 className="text-base font-bold text-gray-700">{category.name}</h2>
        <span className="text-xs text-gray-400 ml-auto">{items.length}개</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onSetQuantity={onSetQuantity}
            onEdit={onEditItem}
            onTriggerPurchase={onTriggerPurchase}
          />
        ))}
      </div>
    </section>
  );
}
