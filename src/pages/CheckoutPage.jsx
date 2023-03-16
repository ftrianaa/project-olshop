import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useCartDispatch, useCartState } from '../actions/Context';
import { AddIcon, ArrowForwardIcon, MinusIcon } from '@chakra-ui/icons';
import { AddCart } from '../actions/Actions';
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useLocation().state;
  const { cart } = useCartState();
  const dispatch = useCartDispatch();

  let total = 0;
  const handleQty = (type, index) => {
    let newArr = cart;

    if (type === 'decrement') {
      newArr[index].quantity--;
      if (newArr[index].quantity === 0) {
        newArr.splice(index, 1);
        AddCart(dispatch, newArr);
      }
    } else if (type === 'increment') {
      newArr[index].quantity++;
    }
    AddCart(dispatch, newArr);
  };
  return (
    <>
      <Header />
      <Heading
        p={5}
        textTransform="uppercase"
        letterSpacing={5}
        fontSize="28px"
      >
        Confirmation
      </Heading>
      <Box p="0, 5">
        <Flex flexDir="column" justify="center" align="center">
          <Box w="50%" border="black 1px solid" borderRadius="10px">
            <Heading>Personal Data</Heading>
            <Box textAlign="left" m="5">
              <Text>Name: {user.name}</Text>
              <Text>Telephone: {user.telephone}</Text>
              <Text>Address: {user.address}</Text>
            </Box>
          </Box>
        </Flex>
        <Box m={5}>
          <Heading>Order List</Heading>
          <Flex justify="center">
            <Box>
              {cart
                ? cart.map((item, index) => {
                    total +=
                      parseFloat(item.products.price) * cart[index].quantity;
                    return (
                      <Card direction="row" w="100%" mt={5}>
                        <Flex justify="center" align="center" p={5}>
                          <Image
                            src={item.products.image}
                            alt={item.products.title}
                            w={100}
                            h={100}
                            maxW="none"
                            objectFit="contain"
                          />
                        </Flex>

                        <CardBody>
                          <Heading
                            fontSize={18}
                            textAlign="left"
                            textOverflow="ellipsis"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            w={['200px', '500px', '500px']}
                            mb={2}
                          >
                            {item.products.title}
                          </Heading>
                          <Flex justify="space-between" mb={2}>
                            <Text>${item.products.price}</Text>

                            <Input
                              type="number"
                              size="sm"
                              w={10}
                              value={cart[index].quantity}
                              variant="unstyled"
                              isReadOnly="true"
                            />
                          </Flex>

                          <Text textAlign="right">
                            $
                            {(
                              parseFloat(item.products.price) *
                              cart[index].quantity
                            ).toFixed(2)}
                          </Text>
                        </CardBody>
                      </Card>
                    );
                  })
                : ''}
              <Box m={5}>
                <Heading textAlign="right">Total: ${total.toFixed(2)}</Heading>
              </Box>
            </Box>
          </Flex>
          <Flex justify="space-between">
            <BackButton />
            <ButtonGroup
              isAttached
              variant="solid"
              onClick={() => navigate('/payment', { state: { total: total } })}
              colorScheme="green"
            >
              <Button textTransform="uppercase" letterSpacing={2}>
                payment
              </Button>
              <IconButton
                aria-label="Add to friends"
                icon={<ArrowForwardIcon />}
              />
            </ButtonGroup>
          </Flex>
        </Box>
        {/* <Text>Total: </Text><Heading fontSize={20}>$ {location.state.total.toFixed(2)}</Heading> */}
      </Box>
      <Footer />
    </>
  );
}
