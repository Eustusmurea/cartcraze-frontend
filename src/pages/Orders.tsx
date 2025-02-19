import { useOrderStore } from "../store/orderStore";

const Orders = () => {
const {orders }= useOrderStore();

return (
    <div className="p-4">
        <h1 className="text-2xl font-bold"> Your Orders</h1>
        {orders.length > 0 ? (
            <p>No Orders Yet</p>
        ) : (
            orders.map((order) => (
                <div key={order.id} className="border p-2 mt-2">
                    <h2 className="text-lg font-bold"> Order#</h2>
                    <p> Date: {new Date(order.date).toLocaleDateString()}</p>
                    <p> Total: {order.total.toFixed(2)}</p>
                    <ul className="mt-2">
                        {order.items.map((item) => (
                            <li key={item.id}>
                                {item.name} - ${item.price} (x{item.quantity})
                            </li>
                        ))}
                    </ul>
                </div>
            ))
        )}
        </div>
);
};

export default Orders;
