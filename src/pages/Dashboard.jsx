import { Box, Card, Heading, Image, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";

export default function Dashboard() {
    const [products, setProducts] = useState([])
    const getProduct = async () => {
        const res = await Api.get('/products')
        setProducts(res.data)
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <>
            <Header />
            <Heading p={5} textTransform="uppercase" letterSpacing={5} >Dashboard</Heading>
            <Box p={10}>
                <Wrap justify='center' align='center' >
                    {products.map((product, index) => (
                        <Card key={index}>
                            <Image src={product.image} w={300} h={200} objectFit='contain' />
                            <Heading textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w={300} p='10px 20px' fontSize='20px'>{product.title}</Heading>
                        </Card>
                    ))}
                </Wrap>
            </Box>
            <Footer />
        </>
    )
}