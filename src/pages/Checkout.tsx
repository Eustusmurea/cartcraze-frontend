import { useCartStore } from "../store/cartStore";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart } = useCartStore();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        await api.post("/orders/create", { items: cart });
        navigate("/orders");
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Checkout</h1>
            <button onClick={handleCheckout} className="bg-blue-500 text-white p-2 rounded">
                Place Order
                </button>
        </div>
    );
};

export default Checkout;