

// import React, { useState, useEffect } from 'react';

// interface FormComponentProps {
//   onClose: () => void;
// }

// interface Category {
//   _id: string;
//   name: string;
// }

// interface Subcategory {
//   _id: string;
//   name: string;
// }

// const FormComponent: React.FC<FormComponentProps> = ({ onClose }) => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     image: null as File | null,
//     categoryId: '',
//     subcategoryId: '',
//   });

//   useEffect(() => {
//     // Fetch categories when the component loads
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('https://fantasy.loandhundo.com/api/categories');
//       const data: Category[] = await response.json();
//       setCategories(data);
//     } catch (err: any) {
//       console.error('Error fetching categories:', err);
//     }
//   };

//   const fetchSubcategories = async (categoryId: string) => {
//     try {
//       const response = await fetch(`https://fantasy.loandhundo.com/api/subcategories/${categoryId}`);
//       const data: Subcategory[] = await response.json();
//       setSubcategories(data);
//     } catch (err: any) {
//       console.error('Error fetching subcategories:', err);
//     }
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedCategoryId = e.target.value;
//     setFormData((prevData) => ({
//       ...prevData,
//       categoryId: selectedCategoryId,
//       subcategoryId: '', // Reset subcategory when category changes
//     }));
//     fetchSubcategories(selectedCategoryId);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value, type, files } = e.target as HTMLInputElement;
//     setFormData({
//       ...formData,
//       [name]: type === 'file' ? (files ? files[0] : null) : value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append('name', formData.name);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('type', formData.type);
//     formDataToSend.append('categoryID', formData.categoryId);
//     formDataToSend.append('subcategoryID', formData.subcategoryId);

//     if (formData.image) {
//       formDataToSend.append('image', formData.image);
//     }

//     try {
//       const response = await fetch('https://fantasy.loandhundo.com/api/products', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit the form');
//       }

//       console.log('Form submitted successfully');
//       setFormData({
//         name: '',
//         description: '',
//         type: '',
//         image: null,
//         categoryId: '',
//         subcategoryId: '',
//       });

//       window.location.reload();
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <div className="mt-4">
//       <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-4 shadow-md rounded-md">
//         {/* Name */}
//         <div className="mb-5.5">
//           <label className="mb-3 block text-sm font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-5.5">
//           <label className="mb-3 block text-sm font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
//           />
//         </div>

//         {/* Type */}
//         <div className="mb-5.5">
//           <label className="mb-3 block text-sm font-medium">Type</label>
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             required
//             className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
//           />
//         </div>

//         {/* Image */}
//         <div className="mb-5.5">
//           <label className="mb-3 block text-sm font-medium">Image</label>
//           <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             accept="image/*"
//             className="w-full rounded border border-dashed border-primary bg-gray py-4 px-4"
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div className="mb-5.5">
//           <label className="mb-3 block text-sm font-medium">Category</label>
//           <select
//             name="categoryId"
//             value={formData.categoryId}
//             onChange={handleCategoryChange}
//             required
//             className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Subcategory Dropdown */}
//         <div className="mb-5.5">
//           <label className="mb-3 block text-sm font-medium">Subcategory</label>
//           <select
//             name="subcategoryId"
//             value={formData.subcategoryId}
//             onChange={handleChange}
//             required
//             className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
//           >
//             <option value="">Select a subcategory</option>
//             {subcategories.map((subcategory) => (
//               <option key={subcategory._id} value={subcategory._id}>
//                 {subcategory.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4.5">
//           <button
//             className="flex justify-center rounded border border-stroke py-2 px-6 font-medium"
//             type="button"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white"
//             type="submit"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FormComponent;

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
        // Reset form or show success message
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