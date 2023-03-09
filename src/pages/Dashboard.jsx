import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Spacer, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";
import { FaStar } from "react-icons/fa";
import { IoMdPerson } from 'react-icons/io'
import DescriptionModal from "../components/DescriptionModal";
import { AddCart } from "../actions/Actions";
import { useCartDispatch, useCartState } from "../actions/Context";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useCartDispatch()
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [item, setItem] = useState([])
    const { cart } = useCartState();

    // const [cart, setCart] = useState([])
    const { onOpen, isOpen, onClose } = useDisclosure()

    const getProduct = async () => {
        const res = await Api.get('/products')
        setProducts(res.data)
    }

    const handleModalDesc = (product) => {
        onOpen()
        setItem(product)
        // console.log(item, 'ini item db')
    }
    // console.log(cart, "cart di dashboard")

    const handleCart = async (product) => {
        // console.log("ini handle cart", cart.cart, product);
        // let newArr = [];
        // console.log(newArr, "newArr")
        
        let newArr = {
            products: product,
            quantity: quantity
        }
        // let send = [arr]
        // console.log(newArr, 'snenene')
        // arr.push({ ...newArr })

        // setQuantity([...quantity,...arr])
        // let hasil = arr
        // console.log(quantity, 'ini hasil')
        await AddCart(dispatch, [...cart, newArr]);
        
        // console.log(cart.cart, 'ini carttt di db')
    }
    // console.log(cart, "cart setelah click dashboard")

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