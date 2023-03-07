import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Spacer, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DescriptionModal from "../components/DescriptionModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";
import { FaStar } from "react-icons/fa";
import { IoMdPerson } from 'react-icons/io'
import { useCartDispatch, useCartState } from "../actions/Context";
import { AddCart } from "../actions/Actions";
export default function Jewelery() {
    const dispatch = useCartDispatch()
    const { cart } = useCartState();

    const [jeweleryProduct, setJeweleryProduct] = useState([])
    const [item, setItem] = useState([])
    const { onOpen, isOpen, onClose } = useDisclosure()
    const getProduct = async () => {
        try {
            const res = await Api.get(`/products/category/jewelery`)
            // console.log(res, 'ini response')
            setJeweleryProduct(res.data)
        } catch (error) {
            throw error
        }
    }
    const handleModalDesc = (product) => {
        onOpen()
        setItem(product)
        console.log(item, 'ini item db')
    }
    let status = ''
    if (cart !== '') {
        status = 'ada'
    }
    if (cart.cart !== undefined) {
        status = 'adaLagi'
    }
    const handleCart = async (product) => {
        if (status === 'ada') {
            await AddCart(dispatch, [...cart, product]);
        }
        else if (status === 'adaLagi') {
            await AddCart(dispatch, [...cart.cart, product]);

        } else { await AddCart(dispatch, [...cart, product]); }
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
                    {jeweleryProduct.map((product, index) => (
                        <Card key={index}>
                        <CardBody>
                            <Image src={product.image} w={300} h={200} objectFit='contain' />
                            <Heading textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w={300} p='10px 20px' fontSize='20px'>{product.title}</Heading>
                            <Text>${product.price}</Text>
                        </CardBody>
                        <Flex justify='center'><FaStar />{product.rating.rate} | <IoMdPerson /> {product.rating.count} </Flex>
                        <CardFooter>
                            <Button onClick={() => handleModalDesc(product)}>Description</Button>
                            <Spacer />
                            <Button onClick={() => handleCart(product)}>Add to Cart</Button>
                        </CardFooter>
                    </Card>
                    ))}
                </Wrap>
            </Box>
            <Footer />
            <DescriptionModal
                isOpen={isOpen}
                onClose={onClose}
                item={item}
            />
        </>
    )
}