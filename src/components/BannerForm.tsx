import React, { useState } from 'react'; 

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

const BannerForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    mobileViewImage: null,
    desktopViewImage: null,
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('mobileViewImage', formData.mobileViewImage);
    formPayload.append('desktopViewImage', formData.desktopViewImage);

    try {
      const response = await fetch('https://fantasy.loandhundo.com/banner', {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        console.log('Banner added successfully');
        // Reset form
        setFormData({
          title: '',
          mobileViewImage: null,
          desktopViewImage: null,
        });

        // Show success message
        setShowSuccessMessage(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error('Error adding banner:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Banner</h2>

        {showSuccessMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Banner added successfully!
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Banner Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile View Image</label>
          <input
            type="file"
            name="mobileViewImage"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Desktop View Image</label>
          <input
            type="file"
            name="desktopViewImage"
            onChange={handleFileChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300"
        >
          Add Banner
        </button>
      </form>
    </div>
  );
};

export default BannerForm;
