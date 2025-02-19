import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      <h2 className="text-lg font-bold mt-2">{name}</h2>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <div className="mt-2 flex justify-between">
        <Link to={`/product/${id}`} className="text-blue-500">View</Link>
        <button
          onClick={() => addToCart({ id, name, price, quantity: 1 })}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
