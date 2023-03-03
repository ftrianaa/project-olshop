import { Box, Card, Image, Wrap, Heading, Text, Flex, CardBody, CardFooter, Button, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdPerson } from 'react-icons/io'
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";

export default function Women() {
    const [womenProduct, setWomenProduct] = useState([])
    const getProduct = async () => {
        try {
            const res = await Api.get(`/products/category/women's%20clothing`)
            // console.log(res, 'ini response')
            setWomenProduct(res.data)
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
            <Heading p={5} textTransform="uppercase" letterSpacing={5} textDecorationLine='underline'>women's space</Heading>

            <Box p={10}>
                <Wrap justify='center' align='center' >
                    {womenProduct.map((product, index) => (
                        <Card key={index}>
                            <CardBody>
                                <Image src={product.image} w={300} h={200} objectFit='contain' />
                                <Heading textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w={300} p='10px 20px' fontSize='20px'>{product.title}</Heading>
                                <Flex justify='center'><FaStar />{product.rating.rate} | <IoMdPerson /> {product.rating.count} </Flex>
                            </CardBody>
                            <CardFooter>
                                <Button>Description</Button>
                                <Spacer/>
                                <Button>Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </Wrap>
            </Box>
            <Footer />
        </>
    )
}