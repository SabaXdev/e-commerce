import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartState } from '../types/cart.types';

export enum CartStorageKey {
  Store = 'ecommerce-cart',
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (cartItem) => cartItem.productId === item.productId,
          );

          if (existingItem) {
            const nextQuantity = Math.min(
              existingItem.quantity + (item.quantity ?? 1),
              item.stockQuantity,
            );

            return {
              items: state.items.map((cartItem) =>
                cartItem.productId === item.productId
                  ? { ...cartItem, quantity: nextQuantity }
                  : cartItem,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                productId: item.productId,
                name: item.name,
                price: item.price,
                stockQuantity: item.stockQuantity,
                quantity: Math.min(item.quantity ?? 1, item.stockQuantity),
              },
            ],
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stockQuantity) }
              : item,
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    }),
    {
      name: CartStorageKey.Store,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
