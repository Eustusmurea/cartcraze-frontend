import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useOrderStore } from "../store/orderStore";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart, clearCart } = useCartStore();
    const addOrder  = useOrderStore((state)=> state.addOrder);
    const [ Loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

 const handleCheckout = () => {
    setLoading(true);

    setTimeout(() => {
        const order = {
            id: crypto.randomUUID(),
            items: cart.map(item => ({ ...item, id: item.id.toString() })),
            total,
            date: new Date().toLocaleDateString(),
        };

        addOrder(order);
        clearCart();
        setLoading(false);
        navigate("/orders");
    }, 2000);
};

return (
    <div className="p-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        {cart.length > 0 ? (
            <>
                {cart.map((item) =>(
                    <div key={item.id} className="border p-2 mt-2 flex justify-between">
                        <p>{item.name} - ${item.price} (x{item.quantity})</p>
                    </div>
                ))}

                <h2 className="text-xl font-bold mt-4">Total: ${total}</h2>
                <button
                    onClick={handleCheckout}
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                    disabled={Loading}
                >
                    {Loading ? "Processing..." : "Confirm Purchase"}
                </button>
            </>

        ) : (
            <p>Your cart is empty.</p>
        )}
    </div>
);
};
 
 export default Checkout;