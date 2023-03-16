import { Route, Routes } from 'react-router-dom';
import DescriptionModal from '../components/DescriptionModal';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import Dashboard from '../pages/Dashboard';
import DescriptionPage from '../pages/DescriptionPage';
import Electronic from '../pages/ElectronicPage';
import FormOrder from '../pages/FormOrder';
import GuestCheckout from '../pages/GuestCheckout';
import Jewelery from '../pages/JeweleryPage';
import Login from '../pages/Login';
import Men from '../pages/MenPage';
import MethodCheckout from '../pages/MethodCheckout';
import PaymentPage from '../pages/PaymentPage';
import SearchPage from '../pages/SearchPage';
import Signup from '../pages/Signup';
import Women from '../pages/WomenPage';

export default function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route exact path="/" element={<Dashboard />} />
      <Route path="/women's clothing" element={<Women />} />
      <Route path="/men's clothing" element={<Men />} />
      <Route path="/jewelery" element={<Jewelery />} />
      <Route path="/electronics" element={<Electronic />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/modal" element={<DescriptionModal />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/confirm" element={<CheckoutPage />} />
      <Route path="/product/:category/:id" element={<DescriptionPage />} />
      <Route path="/form-order" element={<FormOrder />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/checkout-method" element={<MethodCheckout />} />
      <Route path="/guest-checkout" element={<GuestCheckout />} />
    </Routes>
  );
}
