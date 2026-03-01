"use client";

import { useState, useEffect, useCallback } from "react";
import { Item, Category, ItemStatus } from "./types";
import { defaultCategories, defaultItems } from "./initialData";

const ITEMS_KEY = "eum-items";
const CATEGORIES_KEY = "eum-categories";

function loadItems(): Item[] {
  if (typeof window === "undefined") return defaultItems;
  const stored = localStorage.getItem(ITEMS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultItems;
    }
  }
  localStorage.setItem(ITEMS_KEY, JSON.stringify(defaultItems));
  return defaultItems;
}

function loadCategories(): Category[] {
  if (typeof window === "undefined") return defaultCategories;
  const stored = localStorage.getItem(CATEGORIES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultCategories;
    }
  }
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(defaultCategories));
  return defaultCategories;
}

function saveItems(items: Item[]) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

export function getItemStatus(item: Item): ItemStatus {
  if (item.quantity <= 0) return "out";
  if (item.quantity <= item.threshold || item.quantity <= 2) return "low";
  return "sufficient";
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function useInventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // localStorage hydration requires setState in effect (SSR-safe pattern)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(loadItems());
    setCategories(loadCategories());
    setIsLoaded(true);
  }, []);

  const persistItems = useCallback((newItems: Item[]) => {
    setItems(newItems);
    saveItems(newItems);
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, delta: number) => {
      const newItems = items.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      );
      persistItems(newItems);
      const updated = newItems.find((i) => i.id === itemId);
      return updated ?? null;
    },
    [items, persistItems]
  );

  const setQuantity = useCallback(
    (itemId: string, quantity: number) => {
      const newItems = items.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
      );
      persistItems(newItems);
    },
    [items, persistItems]
  );

  const addItem = useCallback(
    (item: Omit<Item, "id">) => {
      const newItem: Item = { ...item, id: generateId() };
      persistItems([...items, newItem]);
    },
    [items, persistItems]
  );

  const updateItem = useCallback(
    (itemId: string, updates: Partial<Omit<Item, "id">>) => {
      const newItems = items.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      );
      persistItems(newItems);
    },
    [items, persistItems]
  );

  const deleteItem = useCallback(
    (itemId: string) => {
      persistItems(items.filter((item) => item.id !== itemId));
    },
    [items, persistItems]
  );

  const getItemsByCategory = useCallback(
    (categoryId: string) => items.filter((item) => item.categoryId === categoryId),
    [items]
  );

  return {
    items,
    categories,
    isLoaded,
    updateQuantity,
    setQuantity,
    addItem,
    updateItem,
    deleteItem,
    getItemsByCategory,
  };
}
