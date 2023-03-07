import { Route, Routes } from "react-router-dom";
import DescriptionModal from "../components/DescriptionModal";
import CartPage from "../pages/CartPage";
import Dashboard from "../pages/Dashboard";
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
            <Route path="/women" element={<Women/>}/>
            <Route path="/men" element={<Men/>}/>
            <Route path="/jewelery" element={<Jewelery/>}/>
            <Route path="/electronic" element={<Electronic/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/modal" element={<DescriptionModal/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/search" element={<SearchPage/>}/>
        </Routes>
    )
}