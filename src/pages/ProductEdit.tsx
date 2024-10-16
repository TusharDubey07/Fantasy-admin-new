import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductEdit: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    console.error('Product data not found in location state.');
    navigate('/products');
    return null;
  }

  const [formData, setFormData] = useState({
    name: product.name || '',
    description: product.description || '',
    mainCategory: location.state?.mainCategoryId || '', // Initialize with mainCategory ID
    category: product.category?.id || '',               // Initialize with category ID
    subcategory: product.subCategory?.id || '',         // Initialize with subcategory ID
    image: null as File | null,
  });

  const [existingImage, setExistingImage] = useState<string | null>(product.image || null);
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [newSubCategoryName, setNewSubCategoryName] = useState('');

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

  // Fetch categories based on selected main category ID
  useEffect(() => {
    const fetchCategories = async () => {
      if (!formData.mainCategory) return;
      try {
        const response = await fetch(`https://fantasy.loandhundo.com/category/${formData.mainCategory}`);
        const categoryData = await response.json();
        setCategories(categoryData);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [formData.mainCategory]);

  // Fetch subcategories based on selected category ID
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!formData.category) return;
      try {
        const response = await fetch(`https://fantasy.loandhundo.com/subcategory/${formData.category}`);
        const subcategoryData = await response.json();

        if (Array.isArray(subcategoryData)) {
          setSubcategories(subcategoryData);
        } else {
          console.error('Subcategories response is not an array:', subcategoryData);
        }
      } catch (err) {
        console.error('Error fetching subcategories:', err);
      }
    };

    fetchSubcategories();
  }, [formData.category]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'file' ? (files ? files[0] : null) : value,
    }));

    // Reset dependent fields when changing main category or category
    if (name === 'mainCategory') {
      setFormData(prevData => ({
        ...prevData,
        category: '',
        subcategory: '',
      }));
    } else if (name === 'category') {
      setFormData(prevData => ({
        ...prevData,
        subcategory: '',
      }));
    }
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setIsSubCategoryModalOpen(true);
    } else {
      setFormData(prevData => ({
        ...prevData,
        subcategory: value,
      }));
    }
  };

  const addNewSubCategory = async () => {
    if (newSubCategoryName.trim() && formData.category) {
      try {
        const response = await fetch('https://fantasy.loandhundo.com/subcategory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newSubCategoryName, categoryId: formData.category })
        });
        if (!response.ok) {
          throw new Error('Failed to add new subcategory');
        }
        const newSubCategory = await response.json();
        setSubcategories([...subcategories, newSubCategory]);
        setFormData(prevData => ({
          ...prevData,
          subcategory: newSubCategory._id,
        }));
        setNewSubCategoryName('');
        setIsSubCategoryModalOpen(false);
      } catch (error) {
        console.error('Error adding new subcategory:', error);
        alert('Failed to add new subcategory');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('mainCategoryId', formData.mainCategory);
    formDataToSend.append('categoryId', formData.category);
    formDataToSend.append('subCategoryId', formData.subcategory);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const url = `https://fantasy.loandhundo.com/editproduct/${product.id}`;
      const response = await fetch(url, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log('Updated product:', updatedProduct);
        alert('Product updated successfully!');
        // Navigate back to the product list with updated product data
        navigate('/products', { 
          state: { 
            updatedProduct: {
              ...updatedProduct,
              category: { id: updatedProduct.categoryId, name: getCategoryName(updatedProduct.categoryId) },
              subCategory: { id: updatedProduct.subCategoryId, name: getSubCategoryName(updatedProduct.subCategoryId) }
            } 
          } 
        });
      } else {
        const errorMsg = await response.text();
        console.error('Server response:', response.status, errorMsg);
        alert(`Failed to update product. Status: ${response.status}. Message: ${errorMsg}`);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred while updating the product.');
    }
  };

  // Helper functions to get category and subcategory names
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : '';
  };

  const getSubCategoryName = (subCategoryId: string) => {
    const subCategory = subcategories.find(subcat => subcat._id === subCategoryId);
    return subCategory ? subCategory.name : '';
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
            onChange={handleSubcategoryChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcat) => (
              <option key={subcat._id} value={subcat._id}>{subcat.name}</option>
            ))}
            <option value="add_new">+ Add New Subcategory</option>
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
            className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
        </div>
      </form>

      {/* Inline Modal for Adding New Subcategory */}
      {isSubCategoryModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Subcategory</h3>
              <div className="mt-2 px-7 py-3">
                <input
                  type="text"
                  value={newSubCategoryName}
                  onChange={(e) => setNewSubCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="New Subcategory Name"
                />
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={addNewSubCategory}
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Add Subcategory
                </button>
                <button
                  onClick={() => setIsSubCategoryModalOpen(false)}
                  className="mt-3 px-4 py-2 bg-gray-300 text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEdit;