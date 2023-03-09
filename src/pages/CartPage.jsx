import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Input, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { AddCart } from "../actions/Actions";
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useCartDispatch, useCartState } from "../actions/Context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const navigate = useNavigate()
    const { cart } = useCartState()
    const dispatch = useCartDispatch()
    const [qty, setQty] = useState(1)
    console.log(cart, 'ini cart di carpage')

    let total = 0

    const deleteCart = (index) => {
        cart.splice(index, 1)
        AddCart(dispatch, cart)
    }

    const handleQuantityPlus = (index) => {
        const newQty = cart[index].quantity + 1
        cart[index].quantity = newQty
        setQty(cart[index].quantity)
        // console.log(cart, 'pulu')
    }

    const handleQuantityMin = (index) => {
        const newQty = cart[index].quantity - 1
        cart[index].quantity = newQty
        setQty(cart[index].quantity)
        if(cart[index].quantity === 0){
            cart.splice(index, 1)
            AddCart(dispatch, cart)
        }
    }
    return (
        <>
            <Header />
            <Heading p={5} textTransform="uppercase" letterSpacing={5} >
                Cart
            </Heading>
            <Box p={10}>
                <TableContainer>
                    <Table variant='simple' size='lg'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Price</Th>
                                <Th>Quantity</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cart ? cart.map((item, index) => {
                                total += parseFloat(item.products.price) *  cart[index].quantity
                                return (
                                    <Tr key={index}>
                                        <Td>{item.products.title}</Td>
                                        <Td>${item.products.price}</Td>
                                        <Td>
                                            <ButtonGroup size='sm' isAttached variant='outline'>
                                                <IconButton aria-label='Add to friends' icon={<MinusIcon />} onClick={() => handleQuantityMin(index)}/>
                                                <Input type='number' size='sm' w={10} value={cart[index].quantity} />
                                                <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={() => handleQuantityPlus(index)} />
                                            </ButtonGroup>
                                        </Td>
                                        <Td><Button onClick={() => deleteCart(index)}>X</Button></Td>
                                    </Tr>
                                )
                            }) : <></>}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Th>Total</Th>
                                <Th>
                                    ${total.toFixed(2)}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
                <Flex justify='right'>
                    <Button onClick={()=>navigate('/payment', {state:{total:total}})}>Checkout</Button>
                </Flex>
            </Box>
            <Footer />

        </>
    )
}