import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <button
          className="mt-4 bg-red-500 text-white p-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const FormComponent = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    mainCategoryId: '',
    categoryId: '',
    subCategoryId: ''
  });
  const [isMainCategoryModalOpen, setIsMainCategoryModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchMainCategories();
  }, []);

  const fetchMainCategories = async () => {
    try {
      const response = await fetch('https://fantasy.loandhundo.com/maincategory');
      if (!response.ok) {
        throw new Error('Failed to fetch main categories');
      }
      const data = await response.json();
      setMainCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching main categories:', error);
      setMainCategories([]);
    }
  };
  

  const handleMainCategoryChange = async (value) => {
    if (value === 'add_new') {
      setIsMainCategoryModalOpen(true);
    } else {
      setSelectedMainCategoryId(value);
      setFormData({ ...formData, mainCategoryId: value, categoryId: '', subCategoryId: '' });
      setSelectedCategoryId('');
      setSelectedSubCategoryId('');
      setSubCategories([]);
      fetchCategories(value);
    }
  };

  const fetchCategories = async (mainCategoryId) => {
    try {
      const response = await fetch(`https://fantasy.loandhundo.com/category/${mainCategoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categoriesData = await response.json();
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const handleCategoryChange = async (value) => {
    if (value === 'add_new') {
      setIsCategoryModalOpen(true);
    } else {
      setSelectedCategoryId(value);
      setFormData({ ...formData, categoryId: value, subCategoryId: '' });
      setSelectedSubCategoryId('');
      fetchSubCategories(value);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await fetch(`https://fantasy.loandhundo.com/subcategory/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const subCategoriesData = await response.json();
      setSubCategories(Array.isArray(subCategoriesData) ? subCategoriesData : []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = (value) => {
    if (value === 'add_new') {
      setIsSubCategoryModalOpen(true);
    } else {
      setSelectedSubCategoryId(value);
      setFormData({ ...formData, subCategoryId: value });
    }
  };

  const addNewMainCategory = async () => {
    if (newItemName.trim()) {
      try {
        const response = await fetch('https://fantasy.loandhundo.com/maincategory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newItemName })
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add new main category. Status: ${response.status}, Message: ${errorText}`);
        }
        const newMainCategory = await response.json();
        setMainCategories([...mainCategories, newMainCategory]);
        setNewItemName('');
        setIsMainCategoryModalOpen(false);
        setSelectedMainCategoryId(newMainCategory._id);
        handleMainCategoryChange(newMainCategory._id);
      } catch (error) {
        console.error('Error adding new main category:', error);
        alert(`Failed to add new main category: ${error.message}`);
      }
    }
  };
  
  const addNewCategory = async () => {
    if (newItemName.trim() && selectedMainCategoryId) {
      try {
        const response = await fetch('https://fantasy.loandhundo.com/category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newItemName, mainCategoryId: selectedMainCategoryId })
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add new category. Status: ${response.status}, Message: ${errorText}`);
        }
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        setNewItemName('');
        setIsCategoryModalOpen(false);
        setSelectedCategoryId(newCategory._id);
        handleCategoryChange(newCategory._id);
      } catch (error) {
        console.error('Error adding new category:', error);
        alert(`Failed to add new category: ${error.message}`);
      }
    }
  };
  
  const addNewSubCategory = async () => {
    if (newItemName.trim() && selectedCategoryId) {
      try {
        const response = await fetch('https://fantasy.loandhundo.com/subcategory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newItemName, categoryId: selectedCategoryId })
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to add new subcategory. Status: ${response.status}, Message: ${errorText}`);
        }
        const newSubCategory = await response.json();
        setSubCategories([...subCategories, newSubCategory]);
        setNewItemName('');
        setIsSubCategoryModalOpen(false);
        setSelectedSubCategoryId(newSubCategory._id);
        setFormData({ ...formData, subCategoryId: newSubCategory._id });
      } catch (error) {
        console.error('Error adding new subcategory:', error);
        alert(`Failed to add new subcategory: ${error.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('description', formData.description);
    formPayload.append('image', formData.image);
    formPayload.append('mainCategoryId', formData.mainCategoryId);
    formPayload.append('categoryId', formData.categoryId);
    formPayload.append('subCategoryId', formData.subCategoryId);

    try {
      const response = await fetch('https://fantasy.loandhundo.com/addproduct', {
        method: 'POST',
        body: formPayload
      });

      if (response.ok) {
        console.log('Product added successfully');
        // Reset form
        setFormData({
          name: '',
          description: '',
          image: null,
          mainCategoryId: '',
          categoryId: '',
          subCategoryId: ''
        });
        setSelectedMainCategoryId('');
        setSelectedCategoryId('');
        setSelectedSubCategoryId('');
        
        // Show success message
        setShowSuccessMessage(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Product</h2>
        
        {showSuccessMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Product added successfully!
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Main Category</label>
          <select
            value={selectedMainCategoryId}
            onChange={(e) => handleMainCategoryChange(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Main Category</option>
            {mainCategories.map((mainCategory) => (
              <option key={mainCategory._id} value={mainCategory._id}>
                {mainCategory.name}
              </option>
            ))}
            <option value="add_new">+ Add New Main Category</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={selectedCategoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
            <option value="add_new">+ Add New Category</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
          <select
            value={selectedSubCategoryId}
            onChange={(e) => handleSubCategoryChange(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>
                {subCategory.name}
              </option>
            ))}
            <option value="add_new">+ Add New Subcategory</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add Product
        </button>
      </form>

      <Modal
        isOpen={isMainCategoryModalOpen}
        onClose={() => setIsMainCategoryModalOpen(false)}
        title="Add New Main Category"
      >
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="New Main Category Name"
        />
        <button
          onClick={addNewMainCategory}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Add Main Category
        </button>
      </Modal>

      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Add New Category"
      >
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="New Category Name"
        />
        <button
          onClick={addNewCategory}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Add Category
        </button>
      </Modal>

      <Modal
        isOpen={isSubCategoryModalOpen}
        onClose={() => setIsSubCategoryModalOpen(false)}
        title="Add New Subcategory"
      >
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="New Subcategory Name"
        />
        <button
          onClick={addNewSubCategory}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
        >
          Add Subcategory
        </button>
      </Modal>
    </div>
  );
};

export default FormComponent;