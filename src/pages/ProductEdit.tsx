import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductEdit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Access product from location state
  const product = location.state?.product;

  // Ensure the product is available
  if (!product) {
    console.error('Product data not found in location state.');
    navigate('/products'); // Navigate away if the product isn't found
    return null; // Prevent rendering if product data is missing
  }

  console.log('Product received:', product); // Debugging line
  console.log('Product ID:', product.id); // Debugging line

  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    mainCategory: product.mainCategory || '',
    category: product.category || '',
    subcategory: product.subCategory || '',
    image: null as File | null,
  });

  const [existingImage, setExistingImage] = useState<string | null>(product.image || null);
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);

  // Fetch main categories
  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await fetch('https://fantasy.loandhundo.com/maincategory');
        const mainCategoryData = await response.json();
        setMainCategories(mainCategoryData);
      } catch (err) {
        console.error('Error fetching main categories:', err);
      }
    };

    fetchMainCategories();
  }, []);

  // Fetch categories based on selected main category
  useEffect(() => {
    const fetchCategories = async () => {
      if (!formData.mainCategory) {
        return; // Exit if main category is not set
      }
      try {
        const response = await fetch(`https://fantasy.loandhundo.com/category/${formData.mainCategory}`);
        const categoryData = await response.json();
        setCategories(categoryData);
        setFormData({ ...formData, category: '', subcategory: '' }); // Reset category and subcategory
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [formData.mainCategory]);

  // Fetch subcategories based on selected category
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.category) {
        return; // Exit if category is not set
      }
      try {
        const response = await fetch(`https://fantasy.loandhundo.com/subcategory/${formData.category}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch subcategories: ${response.statusText}`);
        }
        const subcategoryData = await response.json();
        setSubcategories(subcategoryData);
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    fetchSubcategories();
  }, [formData.category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'file' ? (files ? files[0] : null) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = new FormData();
    updatedProduct.append('name', formData.name);
    updatedProduct.append('description', formData.description);
    updatedProduct.append('mainCategory', formData.mainCategory);
    updatedProduct.append('category', formData.category);
    updatedProduct.append('subcategory', formData.subcategory);
    if (formData.image) {
      updatedProduct.append('image', formData.image);
    }

    if (!product.id) {
      console.error('Product ID is undefined. Cannot update the product.');
      alert('Product ID is not defined. Cannot update the product.');
      return;
    }

    console.log('Updating product with ID:', product.id);
    console.log('Form data:', Object.fromEntries(updatedProduct));

    try {
      const url = `https://fantasy.loandhundo.com/editproduct/${product.id}`;
      console.log('Request URL:', url);

      const response = await fetch(url, {
        method: 'POST', // Changed from PUT to POST
        body: updatedProduct,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const result = await response.json();
        console.log('Update response:', result);
        alert('Product updated successfully!');
        navigate('/products');
      } else {
        const errorMsg = await response.text();
        console.error('Server response:', response.status, errorMsg);
        alert(`Failed to update product. Status: ${response.status}. Message: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred while updating the product. Please check the console for more details.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={4}
          />
        </div>

        {/* Main Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Main Category</label>
          <select
            name="mainCategory"
            value={formData.mainCategory}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Main Category</option>
            {mainCategories.map((mc) => (
              <option key={mc._id} value={mc._id}>{mc.name}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subcategory</label>
          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcat) => (
              <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          {existingImage && (
            <img src={existingImage} alt="Existing Product" className="mb-4 w-32 h-32 object-cover" />
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
