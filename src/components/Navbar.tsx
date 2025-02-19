import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const NavBar = () => {
    const cart = useCartStore((state) => state.cart);
    const { user, logout } = useAuthStore();
    
return(
    <nav className='flex justify-between p-4 bg-blue-500 text-white'>
        <Link to='/' className='text-2xl font-bold'>CartCraze</Link>
        <div className='space-x-4'>
        <Link to="/cart">🛒 Cart ({cart.length})</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/orders">Orders</Link>
            {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logout} className="bg-white text-blue-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-blue-500 px-3 py-1 rounded">Login</Link>
        )}
        </div>

    </nav>
);
};

export default NavBar;