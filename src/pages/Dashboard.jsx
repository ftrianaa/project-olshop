import { Box, Heading } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Dashboard(){
    return(
        <>
        <Header/>
        <Box>
            <Heading>Dashboard</Heading>
        </Box>
        <Footer/>
        </>
    )
}