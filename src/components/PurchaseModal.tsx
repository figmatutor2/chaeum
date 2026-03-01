"use client";

import { Item } from "@/lib/types";

interface PurchaseModalProps {
  item: Item;
  onClose: () => void;
}

export default function PurchaseModal({ item, onClose }: PurchaseModalProps) {
  const handlePurchase = () => {
    if (item.purchaseUrl) {
      window.open(item.purchaseUrl, "_blank", "noopener,noreferrer");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm mx-auto p-6 pb-8 shadow-2xl animate-slide-up">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">!</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">재고가 부족합니다</h3>
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">{item.name}</span>의 재고가{" "}
            {item.quantity === 0 ? "없습니다" : `${item.quantity}개 남았습니다`}.
            <br />
            지금 바로 주문하시겠습니까?
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {item.purchaseUrl ? (
            <button
              onClick={handlePurchase}
              className="w-full py-3.5 bg-teal-500 text-white rounded-2xl font-semibold text-sm hover:bg-teal-600 active:scale-[0.98] transition-all"
            >
              주문하러 가기
            </button>
          ) : (
            <p className="text-center text-xs text-gray-400 py-2">
              구매 링크가 등록되지 않았습니다.<br />
              아이템을 눌러 링크를 등록해주세요.
            </p>
          )}
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-500 rounded-2xl font-medium text-sm hover:bg-gray-50 active:scale-[0.98] transition-all"
          >
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
}
