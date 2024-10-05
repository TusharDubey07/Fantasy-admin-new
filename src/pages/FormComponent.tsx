

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

import React, { useState, useEffect } from 'react';

interface FormComponentProps {
  onClose: () => void;
}

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  _id: string;
  name: string;
}

const FormComponent: React.FC<FormComponentProps> = ({ onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    image: null as File | null,
    categoryId: '',
    subcategoryId: '',
  });

  const typeOptions = ['Ethnic', 'Western', 'Swimsuit', 'Nightwear'];

  useEffect(() => {
    // Fetch categories when the component loads
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fantasy.loandhundo.com/api/categories');
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err: any) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const response = await fetch(`https://fantasy.loandhundo.com/api/subcategories/${categoryId}`);
      const data: Subcategory[] = await response.json();
      setSubcategories(data);
    } catch (err: any) {
      console.error('Error fetching subcategories:', err);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      categoryId: selectedCategoryId,
      subcategoryId: '', // Reset subcategory when category changes
      type: '', // Reset type when category changes
    }));
    fetchSubcategories(selectedCategoryId);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'file' ? (files ? files[0] : null) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('categoryId', formData.categoryId); // Fix categoryId
    formDataToSend.append('subcategoryId', formData.subcategoryId); // Fix subcategoryId

    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await fetch('https://fantasy.loandhundo.com/api/products', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }

      console.log('Form submitted successfully');
      setFormData({
        name: '',
        description: '',
        type: '',
        image: null,
        categoryId: '',
        subcategoryId: '',
      });

      window.location.reload();
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  // Check if the category is "Kids" and subcategory is either "Boys" or "Girls"
  const shouldShowTypeField = (formData.categoryId === '66ad1cf5fe59512b2d5c0f8f') && 
    (formData.subcategoryId === '66ad1e222cfb54481672f179' || formData.subcategoryId === '66ad1e312cfb54481672f17e');

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-4 shadow-md rounded-md">
        {/* Name */}
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
          />
        </div>

        {/* Description */}
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
          />
        </div>

        {/* Show Type Dropdown only for Kids -> Boys/Girls */}
        {shouldShowTypeField && (
          <div className="mb-5.5">
            <label className="mb-3 block text-sm font-medium">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
            >
              <option value="">Select a type</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Image */}
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full rounded border border-dashed border-primary bg-gray py-4 px-4"
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleCategoryChange}
            required
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Dropdown */}
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium">Subcategory</label>
          <select
            name="subcategoryId"
            value={formData.subcategoryId}
            onChange={handleChange}
            required
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
          >
            <option value="">Select a subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;

