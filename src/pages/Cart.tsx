import { useCartStore } from "../store/cartStore";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className="border p-2 mt-2 flex justify-between">
              <p>{item.name} - ${item.price} (x{item.quantity})</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={clearCart} className="bg-red-500 text-white p-2 mt-4 rounded">Clear Cart</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
