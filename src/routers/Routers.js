import { Route, Routes } from "react-router-dom";
import DescriptionModal from "../components/DescriptionModal";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import Dashboard from "../pages/Dashboard";
import DescriptionPage from "../pages/DescriptionPage";
import Electronic from "../pages/ElectronicPage";
import Jewelery from "../pages/JeweleryPage";
import Login from "../pages/Login";
import Men from "../pages/MenPage";
import SearchPage from "../pages/SearchPage";
import Signup from "../pages/Signup";
import Women from "../pages/WomenPage";

export default function Routers() {
    return (
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/women's clothing" element={<Women/>}/>
            <Route path="/men's clothing" element={<Men/>}/>
            <Route path="/jewelery" element={<Jewelery/>}/>
            <Route path="/electronics" element={<Electronic/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/modal" element={<DescriptionModal/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/payment" element={<CheckoutPage/>}/>
            <Route path="/product/:category/:id" element={<DescriptionPage />} />
        </Routes>
    )
}