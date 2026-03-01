"use client";

import { useState } from "react";
import { Item } from "@/lib/types";
import { useInventory, useProfile } from "@/lib/storage";
import { useAuth } from "@/lib/auth";
import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import ItemCard from "@/components/ItemCard";
import PurchaseModal from "@/components/PurchaseModal";
import AddItemModal from "@/components/AddItemModal";
import FloatingAddButton from "@/components/FloatingAddButton";
import ProfileModal from "@/components/ProfileModal";

export default function Home() {
  const {
    categories,
    isLoaded,
    updateQuantity,
    setQuantity,
    addItem,
    updateItem,
    deleteItem,
    getItemsByCategory,
  } = useInventory();

  const { profile, isProfileLoaded, updateProfile, logout } = useProfile();
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth();

  const [activeCategory, setActiveCategory] = useState("bath");
  const [purchaseItem, setPurchaseItem] = useState<Item | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  if (!isLoaded || !isProfileLoaded || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">chaeum</h1>
          <p className="text-sm text-gray-400">불러오는 중...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    logout();
  };

  const currentItems = getItemsByCategory(activeCategory);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header
        avatarUrl={profile.avatarUrl}
        onProfileClick={() => setShowProfileModal(true)}
      />

      <CategoryTabs
        categories={categories}
        activeId={activeCategory}
        onSelect={setActiveCategory}
      />

      <main className="max-w-3xl mx-auto px-6 pt-5 pb-24">
        <div className="flex flex-wrap gap-4">
          {currentItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onQuantityChange={updateQuantity}
              onSetQuantity={setQuantity}
              onEdit={(it) => {
                setEditItem(it);
                setShowAddModal(true);
              }}
              onTriggerPurchase={setPurchaseItem}
            />
          ))}
        </div>
      </main>

      <FloatingAddButton
        onClick={() => {
          setEditItem(null);
          setShowAddModal(true);
        }}
      />

      {purchaseItem && (
        <PurchaseModal
          item={purchaseItem}
          onClose={() => setPurchaseItem(null)}
        />
      )}

      {showAddModal && (
        <AddItemModal
          categories={categories}
          editItem={editItem}
          defaultCategoryId={activeCategory}
          onSave={addItem}
          onUpdate={updateItem}
          onDelete={deleteItem}
          onClose={() => {
            setShowAddModal(false);
            setEditItem(null);
          }}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          profile={profile}
          firebaseUser={user}
          onSave={updateProfile}
          onGoogleLogin={signInWithGoogle}
          onLogout={handleLogout}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}
