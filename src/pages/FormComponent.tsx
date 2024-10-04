// import React, { useState, useEffect } from 'react';
// import { IoMdCloseCircle } from 'react-icons/io';

// interface FormComponentProps {
//   categoryId: string | null;
//   subcategoryId: string | null;
//   onClose: () => void;
// }

// const FormComponent: React.FC<FormComponentProps> = ({ categoryId, subcategoryId, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     type: '',
//     image: null as File | null,
//     subcategoryId: subcategoryId || '',
//   });

//   useEffect(() => {
//     if (subcategoryId) {
//       setFormData((prevData) => ({
//         ...prevData,
//         subcategoryId: subcategoryId,
//       }));
//     }
//   }, [subcategoryId]);

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
//     formDataToSend.append('categoryID', formData.subcategoryId);
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

//       const result = await response.json();
//       console.log('Form submitted successfully:', result);

//       setFormData({
//         name: '',
//         description: '',
//         type: '',
//         image: null,
//         subcategoryId: subcategoryId || '',
//       });

//       window.location.reload();
//     } catch (error) {
//       console.error('Error submitting the form:', error);
//     }
//   };

//   return (
//     <div style={{ position: 'fixed', inset: '0', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
//       <div style={{ backgroundColor: '#94a3b8', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
//           <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>Add Product</h2>
//           <button type="button" style={{ border: 'none', background: 'none' }} onClick={onClose}>
//             <IoMdCloseCircle size={24} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} encType="multipart/form-data">
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Name</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ padding: '0.5rem', width: '100%' }} />
//           </div>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Description</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} required style={{ padding: '0.5rem', width: '100%' }}></textarea>
//           </div>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Type</label>
//             <input type="text" name="type" value={formData.type} onChange={handleChange} required style={{ padding: '0.5rem', width: '100%' }} />
//           </div>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Image</label>
//             <input type="file" name="image" onChange={handleChange} accept="image/*" style={{ padding: '0.5rem', width: '100%' }} />
//           </div>
//           <div style={{ marginBottom: '1.5rem' }}>
//             <label style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>Subcategory</label>
//             <input type="text" name="subcategoryId" value={formData.subcategoryId} readOnly style={{ padding: '0.5rem', width: '100%' }} />
//           </div>
//           <div>
//             <button type="submit" style={{ backgroundColor: 'green', color: 'yellow', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', border: 'none' }}>Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FormComponent;
import React, { useState, useEffect } from 'react';

interface FormComponentProps {
  categoryId: string | null;
  subcategoryId: string | null;
  onClose: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ categoryId, subcategoryId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    image: null as File | null,
    subcategoryId: subcategoryId || '',
  });

  useEffect(() => {
    if (subcategoryId) {
      setFormData((prevData) => ({
        ...prevData,
        subcategoryId: subcategoryId,
      }));
    }
  }, [subcategoryId]);

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
    formDataToSend.append('categoryID', formData.subcategoryId);
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

      const result = await response.json();
      console.log('Form submitted successfully:', result);

      setFormData({
        name: '',
        description: '',
        type: '',
        image: null,
        subcategoryId: subcategoryId || '',
      });

      window.location.reload();
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="mt-4"> {/* Removed modal and fixed positioning */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-4 shadow-md rounded-md">
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
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
          />
        </div>
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
        <div className="mb-5.5">
          <label className="mb-3 block text-sm font-medium">Subcategory</label>
          <input
            type="text"
            name="subcategoryId"
            value={formData.subcategoryId}
            readOnly
            className="w-full rounded border border-stroke bg-gray py-3 px-4.5"
          />
        </div>
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
