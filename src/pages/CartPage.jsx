import { Box, Heading, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { useCartState } from "../actions/Context";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function CartPage() {
    const { cart } = useCartState()

    console.log(cart.cart, 'ini cart di carpage')

    let cartUser = cart.cart
    let total = 0
    return (
        <>
            <Header />
            <Heading p={5} textTransform="uppercase" letterSpacing={5} >
                Cart
            </Heading>
            <Box p={10}>
                <TableContainer>
                    <Table variant='simple'  size='lg'>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Price</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {cartUser !==undefined ? cartUser.map((product, index) => (
                                <Tr>
                                    <Td>{product.title}</Td>
                                    <Td>{product.price}</Td>
                                </Tr>
                            )) : <></>}
                        </Tbody>
                        <Tfoot>
                            { cartUser !== undefined ? cartUser.map((product) => {
                                total += parseFloat(product.price)
                            }) :<></> }
                            <Tr>
                                <Th>Total</Th>
                                <Th>
                                    {total.toFixed(2)}
                                </Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>


            </Box>
            <Footer />
        </>
    )
}