import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Spacer, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DescriptionModal from "../components/DescriptionModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";
import { FaStar } from "react-icons/fa";
import { IoMdPerson } from 'react-icons/io'
import { AddCart } from "../actions/Actions";
import { useCartDispatch, useCartState } from "../actions/Context";
import { useNavigate } from "react-router-dom";
export default function Electronic() {
    const navigate = useNavigate()
    const dispatch = useCartDispatch()
    const { cart } = useCartState();
    const [quantity, setQuantity] = useState(1)
    const [electronicProduct, setElectronicProduct] = useState([])
    const [item, setItem] = useState([])
    const { onOpen, isOpen, onClose } = useDisclosure()
    const getProduct = async () => {
        try {
            const res = await Api.get(`/products`)
            // console.log(res, 'ini response')
            setElectronicProduct(res.data)
        } catch (error) {
            throw error
        }
    }
    const handleModalDesc = (product) => {
        onOpen()
        setItem(product)
        console.log(item, 'ini item db')
    }
    const handleCart = async (product) => {
        let newCart = cart
        newCart = newCart.findIndex((item) => item.products.id === product.id)
        if (newCart === -1) {
            let newArr = {
                products: product,
                quantity: quantity
            }
            await AddCart(dispatch, [...cart, newArr]);
        } else {
            cart[newCart].quantity = cart[newCart].quantity + 1
        }
    }

    useEffect(() => {
        getProduct()
    }, [])
    return (
        <>
            <Header />
            <Heading p={5} textTransform="uppercase" letterSpacing={5} textDecorationLine='underline'>Electronic's space</Heading>

            <Box p={10}>
                <Wrap justify='center' align='center' >
                    {electronicProduct.filter((item) => (item.category ===
                        "electronics")).map((product, index) => (
                            <Card key={index}>
                                <CardBody>
                                    <Image src={product.image} w={300} h={200} objectFit='contain' />
                                    <Heading textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w={300} p='10px 20px' fontSize='20px'>{product.title}</Heading>
                                    <Text>${product.price}</Text>
                                </CardBody>
                                <Flex justify='center'><FaStar />{product.rating.rate} | <IoMdPerson /> {product.rating.count} </Flex>
                                <CardFooter>
                                    <Button onClick={() => navigate(`/product/${product.category}/${product.id}`,{state:{data:product}})}>Description</Button>
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