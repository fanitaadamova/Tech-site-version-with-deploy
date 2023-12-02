import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Header from './components/features/header/Header';
import Footer from './components/features/footer/Footer';
import LoginForm from './components/features/users/login/LoginForm';
import RegisterForm from './components/features/users/register/RegisterForm';
import Catalog from './components/features/products/catalog/Catalog';
import AddProduct from './components/features/products/add-new-product/AddProduct';
import ProductDetails from './components/features/products/details-of-product/ProductDetails';
import HomeProducts from './components/features/home/HomeProducts';
import NotFound from './components/features/not-found/NotFound';
import Laptops from './components/features/home/laptops/Laptops';
import Tablets from './components/features/home/tablets/Tablets';
import Phones from './components/features/home/phones/Phones';
import SmartWatches from './components/features/home/smart-watches/SmartWatches';
import Accessories from './components/features/home/accessories/Accessories';
import Profile from './components/features/users/profile/Profile';
import EditProduct from './components/features/products/edit-product/EditProduct';
import Search from './components/features/products/search/Search';
import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';



function App() {

  return (
    < ErrorBoundary >
      < AuthProvider >

        < Header />
        <main id="site-content">
          < Routes>
            <Route path='/' element={<HomeProducts />} />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/laptops' element={< Laptops />} />
            <Route path='/tablets' element={< Tablets />} />
            <Route path='/phones' element={< Phones />} />
            <Route path='/smart-watches' element={< SmartWatches />} />
            <Route path='/accessories' element={< Accessories />} />
            <Route path='/search' element={< Search />} />
            <Route path='/details/:productId' element={<ProductDetails />} />

            < Route element={< AuthGuard />} >
              <Route path='/edit/:productId' element={< EditProduct />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/profile' element={< Profile />} />
            </Route>

            < Route element={< GuestGuard />} >
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<RegisterForm />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        < Footer />

      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;




