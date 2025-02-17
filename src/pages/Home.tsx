import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products/products/");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-2 rounded-lg shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="font-bold">{product.name}</h2>
            <p>${product.price}</p>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={quantities[product.id] || 1}
                min="1"
                onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                className="w-16 p-2 border rounded"
              />
              <button
                onClick={() => addToCart({ ...product, quantity: quantities[product.id] || 1 })}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
                className="bg-gray-500 text-white p-2 rounded"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
