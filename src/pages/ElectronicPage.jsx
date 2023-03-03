import { Box, Card, Image, Wrap, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";

export default function Electronic() {
    const [electronicProduct, setElectronicProduct] = useState([])
    const getProduct = async () => {
        try {
            const res = await Api.get(`/products/category/electronics`)
            // console.log(res, 'ini response')
            setElectronicProduct(res.data)
        } catch (error) {
            throw error
        }
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (
        <>
            <Header />
            <Heading p={5} textTransform="uppercase" letterSpacing={5} textDecorationLine='underline'>Jewelery's space</Heading>

            <Box p={10}>
                <Wrap justify='center' align='center' >
                    {electronicProduct.map((product, index) => (
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