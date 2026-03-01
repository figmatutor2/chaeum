import { Category, Item } from "./types";

export const defaultCategories: Category[] = [
  { id: "bath", name: "세면용품", emoji: "🧴" },
  { id: "tissue", name: "휴지", emoji: "🧻" },
  { id: "laundry", name: "세탁용품", emoji: "👕" },
  { id: "kitchen", name: "주방용품", emoji: "🍳" },
];

export const defaultItems: Item[] = [
  { id: "1", name: "샴푸", quantity: 2, threshold: 0, purchaseUrl: "", categoryId: "bath", emoji: "🧴", icon: "/icon/shampoo.png" },
  { id: "2", name: "바디워시", quantity: 1, threshold: 0, purchaseUrl: "", categoryId: "bath", emoji: "🧼", icon: "/icon/bodyshower.png" },
  { id: "3", name: "치약", quantity: 3, threshold: 0, purchaseUrl: "", categoryId: "bath", emoji: "🪥", icon: "/icon/toothpaste.png" },
  { id: "4", name: "칫솔", quantity: 5, threshold: 0, purchaseUrl: "", categoryId: "bath", emoji: "🪥", icon: "/icon/toothbrush.png" },
  { id: "5", name: "샤워타올", quantity: 2, threshold: 0, purchaseUrl: "", categoryId: "bath", emoji: "🧽", icon: "/icon/tower.png" },
  { id: "6", name: "키친타올", quantity: 2, threshold: 0, purchaseUrl: "", categoryId: "tissue", emoji: "🧻", icon: "/icon/kitchtower.png" },
  { id: "7", name: "화장실휴지", quantity: 5, threshold: 1, purchaseUrl: "", categoryId: "tissue", emoji: "🧻", icon: "/icon/tissuepaper.png" },
  { id: "8", name: "물티슈", quantity: 3, threshold: 0, purchaseUrl: "", categoryId: "tissue", emoji: "🧻", icon: "/icon/webtissue.png" },
  { id: "9", name: "세탁세제", quantity: 1, threshold: 0, purchaseUrl: "", categoryId: "laundry", emoji: "🧺", icon: "/icon/Laundry detergent.png" },
  { id: "10", name: "섬유 유연제", quantity: 1, threshold: 0, purchaseUrl: "", categoryId: "laundry", emoji: "🌸", icon: "/icon/Fabric softener.png" },
  { id: "11", name: "퐁퐁", quantity: 1, threshold: 0, purchaseUrl: "", categoryId: "kitchen", emoji: "🫧", icon: "/icon/Dish soap.png" },
  { id: "12", name: "수세미", quantity: 2, threshold: 0, purchaseUrl: "", categoryId: "kitchen", emoji: "🧽", icon: "/icon/Sponge.png" },
  { id: "13", name: "강아지 수세미", quantity: 1, threshold: 0, purchaseUrl: "", categoryId: "kitchen", emoji: "🐶", icon: "/icon/Dog sponge.png" },
];
