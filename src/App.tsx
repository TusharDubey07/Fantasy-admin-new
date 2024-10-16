import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import AllProducts from './pages/Dashboard/AllProducts';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import AddProducts from './pages/AddProducts';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import ProductEdit from './pages/ProductEdit';
import TableTwo from './components/Tables/TableTwo';
import AddBanners from './pages/AddBanners';
import AllBanners from './pages/AllBanners';
import BannerProducts from './pages/BannerProducts';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="AllProducts Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AllProducts />
            </>
          }
        />
        
      
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
         <Route path="/products" element={<TableTwo />} />

        
     <Route path="/edit-product/:_id" element={<ProductEdit />} /> 

        <Route
          path="/addProducts"
          element={
            <>
              <PageTitle title="AddProducts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddProducts />
            </>
          }
        />
 <Route
          path="/allBanners"
          element={
            <>
              <PageTitle title="AddProducts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AllBanners />
            </>
          }
        />
        <Route
          path="/addBanners"
          element={
            <>
              <PageTitle title="AddBanners | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <AddBanners />
            </>
          }
        />


        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />    
          

          <Route path="/bannerProducts/:_id" element={<BannerProducts />} />

      </Routes>
     
     
      
    </DefaultLayout>
  );
}

export default App;
