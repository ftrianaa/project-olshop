import { Route, Routes } from 'react-router-dom';
import DescriptionModal from '../components/DescriptionModal';
import CartPage from '../pages/CartPage';
import CategoryPage from '../pages/CategoryPage';
import CheckoutPage from '../pages/CheckoutPage';
import Dashboard from '../pages/Dashboard';
import DescriptionPage from '../pages/DescriptionPage';
import Login from '../pages/Login';
import MethodCheckout from '../pages/MethodCheckout';
import SearchPage from '../pages/SearchPage';
import Signup from '../pages/Signup';

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/modal" element={<DescriptionModal />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/confirm" element={<CheckoutPage />} />
      <Route path="/product/:category/:id" element={<DescriptionPage />} />
      <Route path="/checkout-method" element={<MethodCheckout />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/:category" element={<CategoryPage />} />
    </Routes>
  );
}
