

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

const FormComponent = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    mainCategoryId: '',
    categoryId: '',
    subCategoryId: ''
  });

  // Fetch main categories on component mount
  useEffect(() => {
    fetchMainCategories();
  }, []);;

  // Fetch main categories from API
  const fetchMainCategories = async () => {
    try {
      const response = await fetch('https://fantasy.loandhundo.com/maincategory');
      const data = await response.json();
      setMainCategories(data);
    } catch (error) {
      console.error('Error fetching main categories:', error);
    }
  };

  // Handle main category selection
  const handleMainCategoryChange = async (mainCategoryId) => {
    setSelectedMainCategoryId(mainCategoryId);
    setFormData({ ...formData, mainCategoryId, categoryId: '', subCategoryId: '' });
    setSelectedCategoryId('');
    setSubCategories([]);

    try {
      const response = await fetch(`https://fantasy.loandhundo.com/category/${mainCategoryId}`);
      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };
  // Handle category selection
  const handleCategoryChange = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    setFormData({ ...formData, categoryId, subCategoryId: '' });

    try {
      const response = await fetch(`https://fantasy.loandhundo.com/subcategory/${categoryId}`);
      const subCategoriesData = await response.json();
      setSubCategories(subCategoriesData);
      console.log('Fetched subcategories:', subCategoriesData);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setSubCategories([]);
    }
  };



  // Fetch subcategory details from API using IDs
  const fetchSubCategories = async (subCategoryIds) => {
    try {
      const promises = subCategoryIds.map(id =>
        fetch(`https://fantasy.loandhundo.com/subcategory/${id}`).then(response => response.json())
      );
      const subCategoriesData = await Promise.all(promises);
      console.log('Fetched subcategories:', subCategoriesData); // Add this log
      return subCategoriesData;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (subCategoryId) => {
    setFormData({ ...formData, subCategoryId });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data object to send to the API
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
        
        {/* Main Category Dropdown */}
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
          </select>
        </div>

        {/* Category Dropdown */}
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
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
          {subCategories.length > 0 ? (
            <select
              value={formData.subCategoryId}
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
            </select>
          ) : (
            <p className="text-red-500 text-sm">
              {selectedCategoryId 
                ? "No subcategories available for this category." 
                : "Please select a category first."}
            </p>
          )}
        </div>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Image Field */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default FormComponent;

