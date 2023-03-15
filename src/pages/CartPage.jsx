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
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AddCart } from '../actions/Actions';
import { AddIcon, ArrowForwardIcon, MinusIcon } from '@chakra-ui/icons';
import {
  useAuthState,
  useCartDispatch,
  useCartState,
} from '../actions/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import AlertLogin from '../components/AlertLogin';

export default function CartPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useAuthState();
  const { cart } = useCartState();
  const dispatch = useCartDispatch();
  // console.log(cart, 'ini cart di carpage')

  let total = 0;

  const deleteCart = index => {
    cart.splice(index, 1);
    AddCart(dispatch, cart);
  };
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
        Cart
      </Heading>
      <Box p="5">
        {/* <TableContainer display="inline-block" size="sm">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Picture</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody> */}
        <Flex align="center" justify="center" fontSize="15px">
          <Box>
            {cart ? (
              cart.map((item, index) => {
                total += parseFloat(item.products.price) * cart[index].quantity;
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
                        fontSize="16px"
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
                        <ButtonGroup size="sm" isAttached variant="outline">
                          <IconButton
                            aria-label="Add to friends"
                            icon={<MinusIcon />}
                            onClick={() => handleQty('decrement', index)}
                          />
                          <Input
                            type="number"
                            size="sm"
                            w={10}
                            value={cart[index].quantity}
                          />
                          <IconButton
                            aria-label="Add to friends"
                            icon={<AddIcon />}
                            onClick={() => handleQty('increment', index)}
                          />
                        </ButtonGroup>
                      </Flex>
                      <Text textAlign="right">
                        $
                        {(
                          parseFloat(item.products.price) * cart[index].quantity
                        ).toFixed(2)}
                      </Text>
                    </CardBody>
                  </Card>
                );
              })
            ) : (
              <Heading>You don't have anything in cart</Heading>
            )}
            <Box mt={5}>
              <Heading textAlign="right" fontSize="18px">
                Total: ${total.toFixed(2)}
              </Heading>
            </Box>
          </Box>
        </Flex>
        {user ? (
          <Flex justify="right">
            <ButtonGroup
              isAttached
              variant="solid"
              onClick={() => navigate('/form-order')}
              colorScheme="green"
            >
              <Button textTransform="uppercase" letterSpacing={2}>
                order
              </Button>
              <IconButton
                aria-label="Add to friends"
                icon={<ArrowForwardIcon />}
              />
            </ButtonGroup>
          </Flex>
        ) : (
          <Flex justify="right">
            <ButtonGroup
              isAttached
              variant="solid"
              onClick={onOpen}
              colorScheme="green"
            >
              <Button textTransform="uppercase" letterSpacing={2}>
                order
              </Button>
              <IconButton
                aria-label="Add to friends"
                icon={<ArrowForwardIcon />}
              />
            </ButtonGroup>
          </Flex>
        )}
        <AlertLogin isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Box>
      <Footer />
    </>
  );
}
