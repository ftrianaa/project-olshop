import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

export default function Routers() {
    return (
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
    )
}