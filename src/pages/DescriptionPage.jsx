import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Divider, Flex, Grid, GridItem, Heading, Image, Tag, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaStar } from "react-icons/fa"
import { IoMdPerson } from "react-icons/io"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AddCart } from "../actions/Actions"
import { useAuthState, useCartDispatch, useCartState } from "../actions/Context"
import AlertLogin from "../components/AlertLogin"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Api from "../config/Config"

export default function DescriptionPage() {
    const { category } = useParams()
    const { data } = useLocation().state
    const navigate = useNavigate()
    const dispatch = useCartDispatch()
    const { cart } = useCartState()
    const { user } = useAuthState()
    const { isOpen, onOpen, onClose } = useDisclosure()

    let quantity = 1
    const [product, setProduct] = useState([])
    const getProduct = async () => {
        try {
            const res = await Api.get(`/products?limit=5`)
            // console.log(res, 'ini response')
            setProduct(res.data)
        } catch (error) {
            throw error
        }
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
    const handleBuy = (product) => {
        let newArr = {
            products: product,
            quantity: quantity
        }
        AddCart(dispatch, [newArr]);
        if (user || user === undefined) {
            navigate('/form-order')
            console.log('masuk sini ga')

        }else{
            onOpen()
        }
    }
    useEffect(() => {
        getProduct()
    }, [])
    // console.log(data, 'ini product')
    return (
        <>
            <Header />
            <Box p={10}>
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />} textTransform='capitalize'>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => navigate(`/${category}`)}>{category}</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#' textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w='230px'>{data.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={5}>
                    <GridItem>
                        <Box>
                            <Image src={data.image} w={400} h={400} objectFit='contain' />
                        </Box>
                    </GridItem>
                    <GridItem textAlign='left' colSpan={2}>
                        <Heading>{data.title} <Tag mt={3}>{data.category}</Tag></Heading>
                        <Flex>
                            <FaStar></FaStar> <Text>{data.rating.rate} (rating {data.rating.count})</Text>
                        </Flex>
                        <Heading >${data.price}</Heading>
                        <ButtonGroup>
                            <Button onClick={() => handleBuy(data)}>Buy</Button>
                            <Button onClick={() => handleCart(data)}>Add to Cart</Button>
                        </ButtonGroup>
                        <Text>{data.description}</Text>
                    </GridItem>
                </Grid>
            </Box>
            <Divider />
            <Flex p={5} align='center' textAlign='left'>
                {product.map((item, index) => (
                    <Box border='black solid 1px' w={250} m={5} borderRadius='10px' key={index}>
                        <Image src={item.image} w={250} h={250} objectFit='contain' />
                        <Box m={5}>
                            <Text textOverflow='ellipsis' whiteSpace='nowrap' overflow='hidden' _hover={{ cursor: 'pointer', textDecor: 'underline' }} onClick={() => navigate(`/product/${item.category}/${item.id}`, { state: { data: item } })}>{item.title}</Text>
                            <Flex><FaStar />{item.rating.rate} | <IoMdPerson /> {item.rating.count} </Flex>
                            <Text>${item.price}</Text>
                        </Box>
                        <Button onClick={() => handleCart(item)} w='100%'>Add to Cart</Button>
                    </Box>
                ))}
            </Flex>
            <AlertLogin
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
            <Footer />
        </>
    )
}