import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";

export default function SearchPage(){
    const[search, setSearch]=useState('')
    const getProduct=async()=>{
       try {
         const res = await Api.get()
       } catch (error) {
        throw error
       }
    }
    return(
        <>
        <Header/>

        <Footer/>
        </>
    )
}