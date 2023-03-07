import { Box, Button, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { AddCart } from "../actions/Actions";
import { useCartDispatch, useCartState } from "../actions/Context";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CartPage() {
    const { cart } = useCartState()
    const dispatch = useCartDispatch()

    // console.log(cart, 'ini cart di carpage')
    let status = ''
    if (cart !== '') {
        status = 'adaLagi'
    }
    if (cart.cart !== undefined) {
        status = 'ada'
    }
    let cartUser = cart.cart
    let total = 0

    const deleteCart = (index) => {
        if (status === 'adaLagi') {
            cart.splice(index, 1)
            AddCart(dispatch, cart)
            // console.log('uwuuu')
            // console.log(cart, 'cardel')

        } else if (status === 'ada') {
            // console.log('eyyooo')
            cartUser.splice(index, 1)
            AddCart(dispatch, cartUser)
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
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>

                            {status === 'ada' ? cartUser.map((product, index) => (
                                <Tr key={index}>
                                    <Td>{product.title}</Td>
                                    <Td>{product.price}</Td>
                                    <Td><Button onClick={() => deleteCart(index)}>X</Button></Td>
                                </Tr>
                            )) : <></>}
                            {status === 'adaLagi' ? cart.map((product, index) => (
                                <Tr key={index}>
                                    <Td>{product.title}</Td>
                                    <Td>{product.price}</Td>
                                    <Td><Button onClick={() => deleteCart(index)}>X</Button></Td>
                                </Tr>
                            )) : <></>}
                        </Tbody>
                        <Tfoot>
                            {status === 'ada' ? cartUser.map((product) => {
                                total += parseFloat(product.price)
                            }) : <></>}
                            {status === 'adaLagi' ? cart.map((product) => {
                                total += parseFloat(product.price)
                            }) : <></>}
                            <Tr>
                                <Th>Total</Th>
                                <Th>
                                    {total.toFixed(2)}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
                <Flex justify='right'>
                    <Button>Checkout</Button>
                </Flex>
            </Box>
            <Footer />
        </>
    )
}