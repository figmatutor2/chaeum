"use client";

import { useState } from "react";
import Image from "next/image";
import { Item } from "@/lib/types";
import { getItemStatus } from "@/lib/storage";

interface ItemCardProps {
  item: Item;
  onQuantityChange: (itemId: string, delta: number) => Item | null;
  onSetQuantity: (itemId: string, quantity: number) => void;
  onEdit: (item: Item) => void;
  onTriggerPurchase: (item: Item) => void;
}

const statusLabel = {
  sufficient: "넉넉해요",
  low: "부족해요",
  out: "텅 비었어요!",
};

const statusTextColor = {
  sufficient: "text-green-500",
  low: "text-orange-500",
  out: "text-red-500",
};


export default function ItemCard({
  item,
  onQuantityChange,
  onSetQuantity,
  onEdit,
  onTriggerPurchase,
}: ItemCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.quantity.toString());

  const status = getItemStatus(item);

  const handleDecrease = () => {
    const updated = onQuantityChange(item.id, -1);
    if (updated && updated.quantity <= updated.threshold) {
      onTriggerPurchase(updated);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(item.id, 1);
  };

  const handleQuantityClick = () => {
    setEditValue(item.quantity.toString());
    setIsEditing(true);
  };

  const handleQuantitySubmit = () => {
    const val = parseInt(editValue, 10);
    if (!isNaN(val) && val >= 0) {
      onSetQuantity(item.id, val);
    }
    setIsEditing(false);
  };

  return (
    <div className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] bg-white rounded-3xl p-5 shadow-sm relative flex flex-col items-center transition-all hover:shadow-md">
      {/* 설정 아이콘 */}
      <button
        onClick={() => onEdit(item)}
        className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      </button>

      {/* 아이콘 */}
      <div className="w-16 h-16 flex items-center justify-center mb-3">
        {item.icon ? (
          <Image src={item.icon} alt={item.name} width={56} height={56} className="object-contain" />
        ) : (
          <span className="text-4xl">{item.emoji}</span>
        )}
      </div>

      {/* 이름 */}
      <h3 className="text-base font-bold text-gray-800 mb-1">{item.name}</h3>

      {/* 상태 */}
      <p className={`text-xs font-semibold mb-4 ${statusTextColor[status]}`}>
        {statusLabel[status]}
      </p>

      {/* 수량 조절 */}
      <div className="flex items-center gap-3 w-full justify-center">
        <button
          onClick={handleDecrease}
          disabled={item.quantity <= 0}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl text-gray-400 hover:bg-gray-100 active:scale-90 transition-all disabled:opacity-20"
        >
          &minus;
        </button>

        {isEditing ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleQuantitySubmit}
            onKeyDown={(e) => e.key === "Enter" && handleQuantitySubmit()}
            className="w-12 h-10 text-center text-2xl font-extrabold rounded-lg border-2 border-teal-300 outline-none text-gray-800"
            min={0}
            autoFocus
          />
        ) : (
          <button
            onClick={handleQuantityClick}
            className="w-12 h-10 flex items-center justify-center text-2xl font-extrabold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {item.quantity}
          </button>
        )}

        <button
          onClick={handleIncrease}
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-xl text-gray-400 hover:bg-gray-100 active:scale-90 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
}
