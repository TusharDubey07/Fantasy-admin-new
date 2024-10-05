

// import React, { useState, useEffect } from 'react';

// import FormComponent from './FormComponent';

// // Category and Subcategory types
// interface Category {
//   _id: string;
//   name: string;
// }

// interface Subcategory {
//   _id: string;
//   name: string;
// }

// const AddProduct: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
//   const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showForm, setShowForm] = useState<boolean>(false);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('https://fantasy.loandhundo.com/api/categories');
//       const data: Category[] = await response.json();
//       setCategories(data);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSubcategories = async (categoryId: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`https://fantasy.loandhundo.com/api/subcategories/${categoryId}`);
//       const data: Subcategory[] = await response.json();
//       setSubcategories(data);
//       setSelectedCategoryId(categoryId);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryClick = (categoryId: string) => {
//     if (selectedCategoryId === categoryId) {
//       setSelectedCategoryId(null);
//       setSubcategories([]);
//       setShowForm(false);
//     } else {
//       fetchSubcategories(categoryId);
//       setShowForm(false);
//     }
//   };

//   const handleSubcategoryClick = (subcategoryId: string) => {
//     setSelectedSubcategoryId(subcategoryId);
//     setShowForm(true);
//   };

//   return (
//     <div>
//       <main className="flex-1 p-4">
//         <div className="bg-white shadow-lg rounded-lg p-4">
//           {loading && <p className="text-center">Loading...</p>}
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {categories.length > 0 && (
//             <div style={{ display: 'inline-flex', gap: '20px', flexWrap: 'wrap' }}>
//               {categories.map((category) => (
//                 <div key={category._id} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', borderRadius: '8px' }}>
//                   <button
//                     onClick={() => handleCategoryClick(category._id)}
//                     style={{
//                       backgroundColor: 'green',
//                       color: 'yellow',
//                       padding: '8px 16px',
//                       borderRadius: '4px',
//                       border: 'none',
//                       cursor: 'pointer',
//                       marginBottom: '10px',
//                       fontWeight: selectedCategoryId === category._id ? 'bold' : 'normal',
//                     }}
//                   >
//                     {category.name}
//                   </button>
//                   {selectedCategoryId === category._id && subcategories.length > 0 && (
//                     <ul style={{ listStyleType: 'none', padding: '0', margin: '0', textAlign: 'center' }}>
//                       {subcategories.map((sub) => (
//                         <li key={sub._id} style={{ margin: '5px 0' }}>
//                           <button
//                             onClick={() => handleSubcategoryClick(sub._id)}
//                             style={{
//                               backgroundColor: 'green',
//                               color: 'yellow',
//                               padding: '6px 12px',
//                               borderRadius: '4px',
//                               border: 'none',
//                               cursor: 'pointer',
//                             }}
//                           >
//                             {sub.name}
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Form should be rendered after all subcategories */}
//         {showForm && (
//           <div style={{ width: '100%', marginTop: '20px' }}>
//             <FormComponent
//               categoryId={selectedCategoryId}
//               subcategoryId={selectedSubcategoryId}
//               onClose={() => setShowForm(false)}
//             />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useState } from 'react';
import FormComponent from './FormComponent';

const AddProduct: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleAddProductClick = () => {
    setShowForm(true); // Show the form when "Add Product" button is clicked
  };

  return (
    <div>
      <main className="flex-1 p-4">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <button
            onClick={handleAddProductClick}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Add Product
          </button>

          {/* Render the form when showForm is true */}
          {showForm && (
            <div style={{ width: '100%', marginTop: '20px' }}>
              <FormComponent onClose={() => setShowForm(false)} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddProduct;


