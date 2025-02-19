import { create } from 'zustand';
import { api } from '../api';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

interface ProductStore {
    products: Product[];
    fetchProducts: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    fetchProducts: async () => {
    try {
        const { data } = await api.get('/products');
        set({ products: data });
    } catch (error) {
        console.error('Failed to fetch products');
    }
    },
}));