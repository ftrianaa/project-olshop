import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Image, Input, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { AddCart } from "../actions/Actions";
import { AddIcon, ArrowForwardIcon, MinusIcon } from '@chakra-ui/icons'
import { useAuthState, useCartDispatch, useCartState } from "../actions/Context";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertLogin from "../components/AlertLogin";

export default function CartPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const { user } = useAuthState()
    const { cart } = useCartState()
    const dispatch = useCartDispatch()
    const [qty, setQty] = useState(1)
    // console.log(cart, 'ini cart di carpage')

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
        if (cart[index].quantity === 0) {
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
                    <Table variant='simple' size='md' tableLayout>
                        <Thead>
                            <Tr>
                                <Th>Picture</Th>
                                <Th >Name</Th>
                                <Th>Price</Th>
                                <Th>Quantity</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cart ? cart.map((item, index) => {
                                total += parseFloat(item.products.price) * cart[index].quantity
                                return (
                                    <Tr key={index}>
                                        <Td><Image src={item.products.image} w={100} h={100} objectFit='contain' /></Td>
                                        <Td ><Text textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w='50%' p='10px 20px' >{item.products.title}</Text></Td>
                                        <Td>${item.products.price}</Td>
                                        <Td>
                                            <ButtonGroup size='sm' isAttached variant='outline'>
                                                <IconButton aria-label='Add to friends' icon={<MinusIcon />} onClick={() => handleQuantityMin(index)} />
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
                                <Th><Text fontSize='30px'>total</Text></Th>
                                <Th></Th>
                                <Th>
                                    <Text fontSize='30px'>${total.toFixed(2)}</Text>
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
                {user ? <Flex justify='right'>
                    <ButtonGroup isAttached variant='solid' onClick={() => navigate('/form-order')} colorScheme='green'>
                        <Button textTransform='uppercase' letterSpacing={2}>order</Button>
                        <IconButton aria-label='Add to friends' icon={<ArrowForwardIcon />} />
                    </ButtonGroup>
                </Flex> : 
                <Flex justify='right'>
                <ButtonGroup isAttached variant='solid' onClick={onOpen} colorScheme='green'>
                    <Button textTransform='uppercase' letterSpacing={2}>order</Button>
                    <IconButton aria-label='Add to friends' icon={<ArrowForwardIcon />} />
                </ButtonGroup>
                </Flex>
                }
                <AlertLogin
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            </Box>
            <Footer />

        </>
    )
}