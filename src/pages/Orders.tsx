import { useEffect, useState } from 'react';
import { api } from '../api';

const Orders = () => {
    const [orders , setOrders] = useState<any[]>([]);

    useEffect(() => {
        api.get("/orders/").then((res) => setOrders(res.data));
    }, []);

    return(
        <div className='p4'> 
        <h1 className='text-xl font-bold mb-4'> Your Orders</h1>
        {orders.length === 0 ? (
            <div> No orders found</div>
        ) : (
            orders.map((order) => (
                <div key={order.id} className='border p-2 rounded-lg shadow'>
                    <h2 className='font-bold'>Order #{order.id}</h2>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total}</p>
        </div>
            ))
        )}
        </div>
    );
};

export default Orders;