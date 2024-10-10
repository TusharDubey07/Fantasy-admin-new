import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductData {
  products: Product[];
  mainCategory: {
    id: string;
    name: string;
  };
}

const TableTwo = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const placeholderImage = 'https://via.placeholder.com/150';

  const deleteProduct = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) return;

    setIsDeleting(true);
    setDeleteProductId(id);
    
    try {
      const response = await fetch(`https://fantasy.loandhundo.com/product/${id}`, {
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
      const data: ProductData[] = await response.json();
      setProductData(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.updatedProduct) {
      const updatedProduct = location.state.updatedProduct;
      setProductData(prevData => 
        prevData.map(category => ({
          ...category,
          products: category.products.map(product => 
            product.id === updatedProduct._id ? updatedProduct : product
          )
        }))
      );
      // Clear the updatedProduct state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state?.updatedProduct, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Recently Added Products
        </h4>
      </div>

      <div className="grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-11 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Main Category</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Subcategory</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Description</p>
        </div>
      </div>

      {productData.flatMap((data) =>
        data.products.map((product) => (
          <div
            className="grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-11 md:px-6 2xl:px-7.5"
            key={product.id}
          >
            <div className="col-span-2 flex items-center">
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
                {data.mainCategory.name}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.category?.name || 'N/A'}
              </p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.subCategory?.name || 'N/A'}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.description}
              </p>
            </div>

            {/* Edit and Delete buttons */}
            <div className="col-span-2 flex flex-col sm:flex-row sm:justify-between items-center w-full">
              <button
                className="mt-4 sm:mt-0 sm:ml-20 text-blue-500 hover:text-blue-700"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/edit-product/${product.id}`, { 
                  state: { 
                    product,
                    mainCategoryId: data.mainCategory.id,
                    mainCategoryName: data.mainCategory.name,
                    categoryId: product.category?.id,
                    categoryName: product.category?.name,
                    subCategoryId: product.subCategory?.id,
                    subCategoryName: product.subCategory?.name
                  } 
                })}
              >
                Edit
              </button>

              <button
                className="mt-4 sm:mt-0 sm:ml-10 text-red-500 hover:text-red-700"
                onClick={() => deleteProduct(product.id)}
                disabled={isDeleting && deleteProductId === product.id}
                style={{ cursor: 'pointer' }}
              >
                {isDeleting && deleteProductId === product.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TableTwo;