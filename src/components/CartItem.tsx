import { useCartStore } from "../store/cartStore";

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    onRemove: (id: number) => void;
    }

    const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity }) => {
        const { removeFromCart, updateQuantity } = useCartStore();
      
        return (
          <div className="border p-2 flex justify-between items-center">
            <p>{name} - ${price.toFixed(2)}</p>
            <div className="flex items-center space-x-2">
              <button onClick={() => updateQuantity(id, quantity - 1)} className="px-2 bg-gray-300 rounded">-</button>
              <span>{quantity}</span>
              <button onClick={() => updateQuantity(id, quantity + 1)} className="px-2 bg-gray-300 rounded">+</button>
              <button onClick={() => removeFromCart(id)} className="text-red-500">Remove</button>
            </div>
          </div>
        );
      };
      
      export default CartItem;