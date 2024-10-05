import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { useNavigate } from 'react-router-dom';

const TableTwo = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const placeholderImage = 'https://via.placeholder.com/150';
  const navigate = useNavigate();

  const deleteProduct = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) return;

    setIsDeleting(true);
    setDeleteProductId(id);
    
    try {
      const response = await fetch(`https://fantasy-collection-backend.onrender.com/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete the product. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    } finally {
      setIsDeleting(false);
      setDeleteProductId(null);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fantasy.loandhundo.com/allproducts');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      const allProducts = data.reduce((acc: Product[], categoryData: any) => {
        return [...acc, ...categoryData.products];
      }, []);

      setProducts(allProducts);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Recently Added Products
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Description</p>
        </div>
      </div>

      {products.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={product._id}  // Using _id instead of id
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img
                  src={product.image || placeholderImage}
                  alt="Product"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.category}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.description}
            </p>
          </div>

          {/* Edit button */}
          <div className="col-span-1 flex flex-col sm:flex-row sm:justify-between items-center w-full">
            <button
              className="mt-4 sm:mt-0 sm:ml-20 text-blue-500 hover:text-blue-700"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/edit-product/${product._id}`, { state: { product } })} // Passing product._id
            >
              Edit
            </button>

            {/* Delete button */}
            <button
              className="mt-4 sm:mt-0 sm:ml-10 text-red-500 hover:text-red-700"
              onClick={() => deleteProduct(product._id)}  // Using _id for delete
              disabled={isDeleting && deleteProductId === product._id}
              style={{ cursor: 'pointer' }}
            >
              {isDeleting && deleteProductId === product._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
