import { Box, Button, ButtonGroup, Flex, Heading,  IconButton,  Image, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useCartState } from "../actions/Context";
import { ArrowForwardIcon } from "@chakra-ui/icons";
export default function CheckoutPage() {
    const navigate = useNavigate()
    const { user } = useLocation().state
    const { cart } = useCartState()
    let total =0
    return (
        <>
            <Header />
            <Heading p={5} textTransform="uppercase" letterSpacing={5} >Confirmation</Heading>
            <Box p={10}>
                <Box>
                    <Heading>Personal Data</Heading>
                    <Text>Name: {user.name}</Text>
                    <Text>Telephone: {user.telephone}</Text>
                    <Text>Address: {user.address}</Text>
                </Box>
                <Box>
                    <Heading>Order List</Heading>
                    <Flex justify='center'>
                        <TableContainer w='50%'>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th>Photo</Th>
                                        <Th>Product</Th>
                                        <Th>Price</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {cart ? cart.map((item, index) => {
                                        total += parseFloat(item.products.price) * cart[index].quantity
                                        return (
                                            <Tr key={index}>
                                                <Td><Image src={item.products.image} w={100} h={100} objectFit='contain' /></Td>
                                                <Td><Text textOverflow="ellipsis" overflow='hidden' whiteSpace='nowrap' w='250px' >{item.products.title}</Text></Td>
                                                <Td isNumeric> ${item.products.price}</Td>
                                            </Tr>
                                        )
                                    }) : ''}
                                </Tbody>
                                <Tfoot>
                                    <Tr>
                                        <Th>Total</Th>
                                        <Th></Th>
                                        <Th isNumeric>${total.toFixed(2)}</Th>
                                    </Tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                    </Flex>

                </Box>
                {/* <Text>Total: </Text><Heading fontSize={20}>$ {location.state.total.toFixed(2)}</Heading> */}
                <Flex justify='space-between'>
                    <BackButton />
                    <ButtonGroup isAttached variant='solid' onClick={() => navigate('/payment', { state: { total: total } })} colorScheme='green'>
                        <Button textTransform='uppercase' letterSpacing={2}>payment</Button>
                        <IconButton aria-label='Add to friends' icon={<ArrowForwardIcon />} />
                    </ButtonGroup>
                </Flex>
            </Box>
            <Footer />
        </>
    )
}