import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Product } from "../data/products";
import { NotificationItem, notifications as seedNotifications } from "../data/notifications";

export type BagLine = {
  product: Product;
  qty: number;
};

type AppStateValue = {
  bagItems: BagLine[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearBag: () => void;

  shelfItems: Product[];
  toggleShelf: (product: Product) => void;

  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
};

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export type AppStateProviderProps = {
  children: React.ReactNode;
};

/**
 * The only piece of "backend-like" behaviour in this POC: an in-memory React
 * Context that resets on reload. No persistence, no network — by design.
 */
export function AppStateProvider({ children }: AppStateProviderProps) {
  const [bagItems, setBagItems] = useState<BagLine[]>([]);
  const [shelfItems, setShelfItems] = useState<Product[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(seedNotifications);

  const addItem = useCallback((product: Product, qty: number = 1) => {
    setBagItems((prev) => {
      const existing = prev.find((line) => line.product.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id ? { ...line, qty: line.qty + qty } : line
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setBagItems((prev) => prev.filter((line) => line.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    setBagItems((prev) =>
      prev.map((line) => (line.product.id === productId ? { ...line, qty: Math.max(1, qty) } : line))
    );
  }, []);

  const clearBag = useCallback(() => setBagItems([]), []);

  const toggleShelf = useCallback((product: Product) => {
    setShelfItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const value = useMemo<AppStateValue>(
    () => ({
      bagItems,
      addItem,
      removeItem,
      updateQty,
      clearBag,
      shelfItems,
      toggleShelf,
      notifications,
      markNotificationRead,
    }),
    [bagItems, addItem, removeItem, updateQty, clearBag, shelfItems, toggleShelf, notifications, markNotificationRead]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

function useAppStateContext(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("This hook must be used within an <AppStateProvider>.");
  }
  return ctx;
}

export type UseBagResult = {
  items: BagLine[];
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

/** The shopping bag: in-memory line items keyed by product id. */
export function useBag(): UseBagResult {
  const { bagItems, addItem, removeItem, updateQty, clearBag } = useAppStateContext();

  const count = useMemo(() => bagItems.reduce((sum, line) => sum + line.qty, 0), [bagItems]);
  const subtotal = useMemo(
    () => bagItems.reduce((sum, line) => sum + line.product.priceValue * line.qty, 0),
    [bagItems]
  );

  return { items: bagItems, addItem, removeItem, updateQty, clear: clearBag, count, subtotal };
}

export type UseShelfResult = {
  items: Product[];
  toggle: (product: Product) => void;
  isSaved: (productId: string) => boolean;
};

/** The shelf (wishlist): saved products, toggled on/off. */
export function useShelf(): UseShelfResult {
  const { shelfItems, toggleShelf } = useAppStateContext();

  const isSaved = useCallback(
    (productId: string) => shelfItems.some((p) => p.id === productId),
    [shelfItems]
  );

  return { items: shelfItems, toggle: toggleShelf, isSaved };
}

export type UseNotificationsResult = {
  items: NotificationItem[];
  unreadCount: number;
  markRead: (id: string) => void;
};

/** Notifications, seeded from data/notifications.ts. */
export function useNotifications(): UseNotificationsResult {
  const { notifications, markNotificationRead } = useAppStateContext();

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  return { items: notifications, unreadCount, markRead: markNotificationRead };
}
