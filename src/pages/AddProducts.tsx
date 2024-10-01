// import { useEffect, useState } from 'react';
// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import userThree from '../images/user/user-03.png';

// const AddProducts = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('https://fantasy.loandhundo.com/api/categories');
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const data = await response.json();
//         setCategories(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <>
//       <div className="mx-auto max-w-270">
//         <Breadcrumb pageName="AddProducts" />

//         <div className="grid grid-cols-5 gap-8">
//           <div className="col-span-5 xl:col-span-3">
//             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//               <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                 <h3 className="font-medium text-black dark:text-white">
//                   Personal Information
//                 </h3>
//               </div>
//               <div className="p-7">
//                 <form action="#">
//                   <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
//                     <div className="w-full sm:w-1/2">
//                       <label
//                         className="mb-3 block text-sm font-medium text-black dark:text-white"
//                         htmlFor="fullName"
//                       >
//                         Name
//                       </label>
//                       <div className="relative">
//                         <input
//                           className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                           type="text"
//                           name="fullName"
//                           id="fullName"
//                           placeholder="fantasy"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mb-5.5">
//                     <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="category">
//                       Category
//                     </label>
//                     <div className="relative">
//                       {loading ? (
//                         <p>Loading categories...</p>
//                       ) : error ? (
//                         <p>{error}</p>
//                       ) : (
//                         <select
//                           className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                           id="category"
//                           value={selectedCategory}
//                           onChange={handleCategoryChange}
//                         >
//                           <option value="" disabled>Select a category</option>
//                           {categories.map((category) => (
//                             <option key={category.id} value={category.id}>
//                               {category.name}
//                             </option>
//                           ))}
//                         </select>
//                       )}
//                     </div>
//                   </div>

//                   <div className="mb-5.5">
//                     <label
//                       className="mb-3 block text-sm font-medium text-black dark:text-white"
//                       htmlFor="description"
//                     >
//                       Description
//                     </label>
//                     <input
//                       className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
//                       type="text"
//                       name="description"
//                       id="description"
//                       placeholder="description"
//                     />
//                   </div>

//                   <div className="flex justify-end gap-4.5">
//                     <button
//                       className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
//                       type="submit"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
//                       type="submit"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>

//           <div className="col-span-5 xl:col-span-2">
//             <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//               <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
//                 <h3 className="font-medium text-black dark:text-white">Upload Photo</h3>
//               </div>
//               <div className="p-7">
//                 <form action="#">
//                   <div
//                     id="FileUpload"
//                     className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
//                   >
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
//                     />
//                     <div className="flex flex-col items-center justify-center space-y-3">
//                       <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
//                         <svg
//                           width="16"
//                           height="16"
//                           viewBox="0 0 16 16"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
//                             fill="#3C50E0"
//                           />
//                           <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
//                             fill="#3C50E0"
//                           />
//                           <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
//                             fill="#3C50E0"
//                           />
//                         </svg>
//                       </span>
//                       <p>
//                         <span className="text-primary">Click to upload</span> or
//                         drag and drop
//                       </p>
//                       <p className="mt-1.5">SVG, PNG, JPG </p>
//                       <p>(max, 10mb)</p>
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-4.5">
//                     <button
//                       className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
//                       type="submit"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
//                       type="submit"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddProducts;
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';

const AddProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFieldType, setSelectedFieldType] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fantasy.loandhundo.com/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFieldTypeChange = (e) => {
    setSelectedFieldType(e.target.value);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Capture the selected image
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a formData object to send all data
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('category', selectedCategory);
    formData.append('field_type', selectedFieldType);
    formData.append('sub_category', selectedSubCategory);
    formData.append('description', description);
    formData.append('image', image); // Append image file

    try {
      const response = await fetch('https://fantasy.loandhundo.com/api/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const result = await response.json();
      setSuccessMessage('Product added successfully!');
      // Reset the form
      setProductName('');
      setSelectedCategory('');
      setSelectedFieldType('');
      setSelectedSubCategory('');
      setDescription('');
      setImage(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="AddProducts" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Product Information</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="productName">
                        Product Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="category">
                      Category
                    </label>
                    <div className="relative">
                      {loading ? (
                        <p>Loading categories...</p>
                      ) : error ? (
                        <p>{error}</p>
                      ) : (
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          id="category"
                          value={selectedCategory}
                          onChange={handleCategoryChange}
                          required
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Field Type Dropdown */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fieldType">
                      Field Type
                    </label>
                    <select
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="fieldType"
                      value={selectedFieldType}
                      onChange={handleFieldTypeChange}
                      required
                    >
                      <option value="" disabled>
                        Select a field type
                      </option>
                      <option value="Ethnic">Ethnic</option>
                      <option value="Western">Western</option>
                      <option value="Nightwear">Nightwear</option>
                      <option value="Swimsuit">Swimsuit</option>
                      <option value="Woollen">Woollen</option>
                    </select>
                  </div>

                  {/* Sub Category Dropdown for Boys/Girls (shown only if category is "Kids") */}
                  {selectedCategory === 'Kids' && (
                    <div className="mb-5.5">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="subCategory">
                        Sub Category
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        id="subCategory"
                        value={selectedSubCategory}
                        onChange={handleSubCategoryChange}
                        required
                      >
                        <option value="" disabled>
                          Select a sub category
                        </option>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                      </select>
                    </div>
                  )}

                  {/* Description Input */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter product description"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="mb-5.5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="image">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
                
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProducts;
