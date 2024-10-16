import { useEffect, useState } from 'react';
import { Product } from '../../types/product';
import { useParams } from 'react-router-dom';

interface ProductData {
  products: Product[];
  mainCategory: {
    id: string;
    name: string;
  };
}

interface LinkedProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
}

interface BannerProductsData {
  bannerTitle: string;
  products: LinkedProduct[];
}

const BannerProducts = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [linkedProducts, setLinkedProducts] = useState<LinkedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { _id } = useParams<{ _id: string }>();

  const placeholderImage = 'https://via.placeholder.com/150';

  const fetchProducts = async () => {
    try {
      const [allProductsResponse, linkedProductsResponse] = await Promise.all([
        fetch('https://fantasy.loandhundo.com/allproducts'),
        fetch(`https://fantasy.loandhundo.com/banner/${_id}/products`)
      ]);

      if (!allProductsResponse.ok) {
        throw new Error('Failed to fetch all products');
      }

      const allProductsData: ProductData[] = await allProductsResponse.json();
      setProductData(allProductsData);

      if (linkedProductsResponse.ok) {
        const linkedProductsData: BannerProductsData = await linkedProductsResponse.json();
        setLinkedProducts(linkedProductsData.products);
      } else if (linkedProductsResponse.status === 404) {
        // No linked products, set an empty array
        setLinkedProducts([]);
      } else {
        throw new Error('Failed to fetch linked products');
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const toggleProductLink = async (productId: string, isCurrentlyLinked: boolean) => {
    try {
      const url = `https://fantasy.loandhundo.com/banner/${_id}/${isCurrentlyLinked ? 'unlink-product' : 'link-product'}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product link');
      }

      // Refresh the products after updating
      fetchProducts();
    } catch (error) {
      console.error('Error updating product link:', error);
      alert('Failed to update product link. Please try again.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Banner Products
        </h4>
      </div>

      <div className="grid grid-cols-11 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-13 md:px-6 2xl:px-7.5">
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
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Description</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Link Status</p>
        </div>
      </div>

      {productData.flatMap((data) =>
        data.products.map((product) => {
          const isLinked = linkedProducts.some(linkedProduct => linkedProduct._id === product.id);
          return (
            <div
              className="grid grid-cols-11 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-13 md:px-6 2xl:px-7.5"
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
              <div className="col-span-2 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.description}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isLinked}
                      onChange={() => toggleProductLink(product.id, isLinked)}
                    />
                    <div className={`block w-14 h-8 rounded-full ${isLinked ? 'bg-green-500' : 'bg-red-600'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isLinked ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                  <div className="ml-3 text-gray-700 font-medium">
                    {isLinked ? 'Linked' : 'Unlinked'}
                  </div>
                </label>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BannerProducts;
