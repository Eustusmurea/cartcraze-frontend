import { create } from 'zustand';

interface Order {
    id: string;
    items: { id: string; name: string; price: number; quantity: number }[];
    total: number;
    date: string;
}

interface OrderState {
    orders: Order[];
    addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
}));