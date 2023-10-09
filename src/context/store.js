import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const cartStore = (set, get) => ({
    cart: [],
    addToCart: (product) => {
        const items = get().cart;
        const exist = items.find((item) => item?._id === product?._id);

        if (exist) {
            set((prev) => ({
                cart: prev.cart.map((item) =>
                    item?._id === product?._id
                        ? {
                              ...exist,
                              quantity: exist?.quantity + 1,
                          }
                        : item
                ),
            }));
        } else {
            set((prev) => ({
                cart: [...prev.cart, { ...product, quantity: 1 }],
            }));
        }
    },
    removeFromCart: (product) => {
        const items = get().cart;
        const exist = items.find((item) => item?._id === product?._id);
        if (exist.quantity === 1) {
            set((prev) => ({
                cart: prev.cart.filter((item) => item?._id !== product?._id),
            }));
        } else {
            set((prev) => ({
                cart: prev.cart.map((item) =>
                    item?._id === product?._id
                        ? {
                              ...exist,
                              quantity: exist?.quantity - 1,
                          }
                        : item
                ),
            }));
        }
    },
    clearCart: () => set(() => ({ cart: [] })),
});

const useCartStore = create(
    devtools(persist(cartStore, { name: 'cart', skipHydration: true }))
);

export default useCartStore;
