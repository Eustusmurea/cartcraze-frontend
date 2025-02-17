import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { useCartStore } from '../store/cartStore';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const { addToCart } = useCartStore();

    useEffect(() => {
        api.get(`/products/products/${id}`).then((res) => setProduct(res.data));
    }, [id]);

    if (!product)
        return <div>Loading...</div>;
    
    return (
        <div className='p-4'>
            <img src={product.image} alt={product.name} className='w-full h-96 object-cover rounded-lg' />
            <h1 className='text-2xl font-bold mt-4'>{product.name}</h1>
            <p className='text-lg mt-2'>${product.price}</p>
            <button onClick={() => addToCart({ ...product, quantity: 1 })} className='bg-blue-500 text-white p-2 rounded mt-4'>Add to Cart</button>
        
        </div>
    );
};

export default Product;