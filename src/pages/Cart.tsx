import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  product_name: string;
  product_price: number;
  product: {
    id: number;
  };
}
import { api } from "../api"; // API utility
import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const { cart, removeFromCart } = useCartStore();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart/");
        setCartItems(res.data.items); // Use the 'items' field to get cart items with product details
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between border-b p-2">
            <span>
              {item.product_name} - ${item.product_price}
            </span>
            <button
              className="text-red-500"
              onClick={() => removeFromCart(item.product.id)}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
