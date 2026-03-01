"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Item, Category } from "@/lib/types";

interface AddItemModalProps {
  categories: Category[];
  editItem?: Item | null;
  defaultCategoryId?: string;
  onSave: (item: Omit<Item, "id">) => void;
  onUpdate: (itemId: string, updates: Partial<Omit<Item, "id">>) => void;
  onDelete: (itemId: string) => void;
  onClose: () => void;
}

const iconOptions = [
  { path: "/icon/shampoo.png", label: "샴푸" },
  { path: "/icon/bodyshower.png", label: "바디워시" },
  { path: "/icon/toothpaste.png", label: "치약" },
  { path: "/icon/toothbrush.png", label: "칫솔" },
  { path: "/icon/tower.png", label: "샤워타올" },
  { path: "/icon/kitchtower.png", label: "키친타올" },
  { path: "/icon/tissuepaper.png", label: "화장실휴지" },
  { path: "/icon/webtissue.png", label: "물티슈" },
  { path: "/icon/Laundry detergent.png", label: "세탁세제" },
  { path: "/icon/Fabric softener.png", label: "섬유유연제" },
  { path: "/icon/Dish soap.png", label: "퐁퐁" },
  { path: "/icon/Sponge.png", label: "수세미" },
  { path: "/icon/Dog sponge.png", label: "강아지수세미" },
];

export default function AddItemModal({
  categories,
  editItem,
  defaultCategoryId,
  onSave,
  onUpdate,
  onDelete,
  onClose,
}: AddItemModalProps) {
  const [name, setName] = useState(editItem?.name ?? "");
  const [quantity, setQuantity] = useState(editItem?.quantity ?? 1);
  const [quantityText, setQuantityText] = useState(String(editItem?.quantity ?? 1));
  const [threshold, setThreshold] = useState(editItem?.threshold ?? 0);
  const [thresholdText, setThresholdText] = useState(String(editItem?.threshold ?? 0));
  const [purchaseUrl, setPurchaseUrl] = useState(editItem?.purchaseUrl ?? "");
  const [categoryId, setCategoryId] = useState(editItem?.categoryId || defaultCategoryId || categories[0]?.id || "");
  const [icon, setIcon] = useState(editItem?.icon || iconOptions[0].path);
  const [emoji] = useState(editItem?.emoji || "📦");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      if (dataUrl) {
        setIcon(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (editItem) {
      onUpdate(editItem.id, {
        name: name.trim(),
        quantity,
        threshold,
        purchaseUrl: purchaseUrl.trim(),
        categoryId,
        emoji,
        icon,
      });
    } else {
      onSave({
        name: name.trim(),
        quantity,
        threshold,
        purchaseUrl: purchaseUrl.trim(),
        categoryId,
        emoji,
        icon,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (editItem) {
      onDelete(editItem.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm mx-auto p-6 pb-8 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <h3 className="text-lg font-bold text-gray-900 mb-5">
          {editItem ? "아이템 수정" : "아이템 추가"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">아이콘</label>
            <div className="flex gap-2 flex-wrap">
              {iconOptions.map((opt) => (
                <button
                  key={opt.path}
                  onClick={() => setIcon(opt.path)}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                    icon === opt.path
                      ? "bg-teal-50 ring-2 ring-teal-400 scale-110"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  title={opt.label}
                >
                  <Image src={opt.path} alt={opt.label} width={28} height={28} className="object-contain" />
                </button>
              ))}

              {/* 사용자 업로드 아이콘이 프리셋에 없으면 표시 */}
              {icon && !iconOptions.some((o) => o.path === icon) && (
                <div className="w-11 h-11 rounded-xl bg-teal-50 ring-2 ring-teal-400 scale-110 flex items-center justify-center">
                  <Image src={icon} alt="custom" width={28} height={28} className="object-contain rounded" />
                </div>
              )}

              {/* 직접 등록 버튼 */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-11 h-11 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all border border-dashed border-gray-300 text-gray-400"
                title="이미지 직접 등록"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 샴푸"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-all"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">카테고리</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    categoryId === cat.id
                      ? "bg-teal-500 text-white shadow-md"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">현재 수량</label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const v = Math.max(0, quantity - 1);
                    setQuantity(v);
                    setQuantityText(String(v));
                  }}
                  className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center text-lg font-bold hover:bg-gray-200 active:scale-95 transition-all shrink-0"
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={quantityText}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setQuantityText(raw);
                    if (raw !== "") setQuantity(parseInt(raw));
                  }}
                  onBlur={() => {
                    if (quantityText === "") {
                      setQuantity(0);
                      setQuantityText("0");
                    }
                  }}
                  className="flex-1 min-w-0 px-2 py-2.5 rounded-xl border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    const v = quantity + 1;
                    setQuantity(v);
                    setQuantityText(String(v));
                  }}
                  className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center text-lg font-bold hover:bg-gray-200 active:scale-95 transition-all shrink-0"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">알림 기준</label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    const v = Math.max(0, threshold - 1);
                    setThreshold(v);
                    setThresholdText(String(v));
                  }}
                  className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center text-lg font-bold hover:bg-gray-200 active:scale-95 transition-all shrink-0"
                >
                  −
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={thresholdText}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setThresholdText(raw);
                    if (raw !== "") setThreshold(parseInt(raw));
                  }}
                  onBlur={() => {
                    if (thresholdText === "") {
                      setThreshold(0);
                      setThresholdText("0");
                    }
                  }}
                  className="flex-1 min-w-0 px-2 py-2.5 rounded-xl border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    const v = threshold + 1;
                    setThreshold(v);
                    setThresholdText(String(v));
                  }}
                  className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center text-lg font-bold hover:bg-gray-200 active:scale-95 transition-all shrink-0"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">
              구매 링크 (선택)
            </label>
            <input
              type="url"
              value={purchaseUrl}
              onChange={(e) => setPurchaseUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-teal-400 transition-all"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full py-3.5 bg-teal-500 text-white rounded-2xl font-semibold text-sm hover:bg-teal-600 active:scale-[0.98] transition-all disabled:opacity-40 disabled:shadow-none"
          >
            {editItem ? "저장하기" : "추가하기"}
          </button>

          {editItem && !showDeleteConfirm && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 text-red-500 rounded-2xl font-medium text-sm hover:bg-red-50 active:scale-[0.98] transition-all"
            >
              삭제하기
            </button>
          )}

          {editItem && showDeleteConfirm && (
            <button
              onClick={handleDelete}
              className="w-full py-3 bg-red-500 text-white rounded-2xl font-semibold text-sm hover:bg-red-600 active:scale-[0.98] transition-all"
            >
              정말 삭제할까요?
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 rounded-2xl font-medium text-sm hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
