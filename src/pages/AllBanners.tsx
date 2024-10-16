import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Banner {
  _id: string;
  title: string;
  mobileViewImage: string;
  desktopViewImage: string;
  linkedProducts: string[];
}

const AllBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingBannerId, setDeletingBannerId] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchBanners = async () => {
    try {
      const response = await fetch('https://fantasy.loandhundo.com/allbanner');
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      const data = await response.json();
      setBanners(data.banner);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteBanner = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this banner?");
    if (!isConfirmed) return;

    setDeletingBannerId(id);
    
    try {
      const response = await fetch(`https://fantasy.loandhundo.com/deletebanner/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBanners();
        alert("Banner deleted successfully.");
      } else {
        alert("Failed to delete the banner. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      alert("Failed to delete the banner. Please try again.");
    } finally {
      setDeletingBannerId(null);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Banners
        </h4>
      </div>

      <div className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Mobile View Image</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Desktop View Image</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Title</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {banners.map((banner) => (
        <div
          className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
          key={banner._id}
        >
          <div className="col-span-3 flex items-center">
            <img
              src={banner.mobileViewImage}
              alt="Mobile View"
              className="h-12.5 w-15 rounded-md object-cover"
            />
          </div>
          <div className="col-span-3 flex items-center">
            <img
              src={banner.desktopViewImage}
              alt="Desktop View"
              className="h-12.5 w-15 rounded-md object-cover"
            />
          </div>
          <div className="col-span-3 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {banner.title}
            </p>
          </div>
          <div className="col-span-3 flex items-center space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => navigate(`/bannerProducts/${banner._id}`)}
              style={{ cursor: 'pointer' }}
            >
              Link Products
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteBanner(banner._id)}
              disabled={deletingBannerId === banner._id}
              style={{ cursor: 'pointer' }}
            >
              {deletingBannerId === banner._id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBanners;
