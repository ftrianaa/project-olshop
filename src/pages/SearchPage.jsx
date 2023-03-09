import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, Spacer, Text, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { AddCart } from "../actions/Actions";
import { useCartDispatch, useCartState } from "../actions/Context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Api from "../config/Config";

export default function SearchPage() {
  const { name } = useLocation().state
  // console.log(name, 'ini searchnameee')
  const dispatch = useCartDispatch()
  const navigate = useNavigate()
  const { cart } = useCartState();
  const [quantity, setQuantity] = useState(1)
  const [find, setFind] = useState([])
  const getProduct = async () => {
    try {
      const res = await Api.get(`/products`)
      setFind(res.data)
    } catch (error) {
      throw error
    }
  }
  // console.log(find, 'ini search')
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
      <Box p={10}>
        <Heading p={5} textTransform="uppercase" letterSpacing={5} textAlign='left'>Search for: {name}</Heading>
        <Wrap justify='center' align='center' >
          {find.filter((item) => {
            return name.toLowerCase() === '' ?
              item : item.title.toLowerCase().includes(name) || name.toLowerCase() === ''
          }).map((item, index) => (
            <Card key={index}>
              <CardBody>
                <Image src={item.image} w={300} h={200} objectFit='contain' />
                <Heading textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w={300} p='10px 20px' fontSize='20px'>{item.title}</Heading>
                <Text>${item.price}</Text>
              </CardBody>
              <Flex justify='center'><FaStar />{item.rating.rate} | <IoMdPerson /> {item.rating.count} </Flex>
              <CardFooter>
                <Button onClick={() => navigate(`/product/${item.category}/${item.id}`, { state: { data: item } })}>Description</Button>
                <Spacer />
                <Button onClick={() => handleCart(item)}>Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </Wrap>
      </Box>
      <Footer />
    </>
  )
}