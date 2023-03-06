import { Route, Routes } from "react-router-dom";
import DescriptionModal from "../components/DescriptionModal";
import Dashboard from "../pages/Dashboard";
import Electronic from "../pages/ElectronicPage";
import Jewelery from "../pages/JeweleryPage";
import Login from "../pages/Login";
import Men from "../pages/MenPage";
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

        </Routes>
    )
}