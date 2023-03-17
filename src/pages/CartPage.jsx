import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddCart, AddPromo } from '../actions/Actions';
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
import { useState } from 'react';

export default function CartPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useAuthState();
  // console.log(user.email, 'ini finaltotal di carttt');
  const { cart, discount } = useCartState();
  const dispatch = useCartDispatch();
  // console.log(cart, 'ini cart di carpage');
  // console.log(discount, 'ini discount di guest cart');

  const [promo, setPromo] = useState('');
  let total = 0;
  // let disc = 0;
  // const [discounts, setDiscount] = useState(0);
  const [errors, setErrors] = useState('');
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
  const handlePromo = () => {
    let newPromo = promo;
    newPromo.toLocaleLowerCase();
    if (newPromo === 'promograndlaunching') {
      // console.log(total, 'ini total');
      // disc = 10;
      // setDiscount(total - disc);
      setErrors(false);
      AddPromo(dispatch, 10);
      // console.log(totalFix, 'ini hasil total');
      console.log('ini discount di guest cart handle');
    } else {
      // setDiscount(total - disc);
      setErrors(true);
    }
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
        <Grid
          templateRows={['repeat(1, 1fr)', 'repeat(0, 1fr)', 'repeat(0, 1fr)']}
          templateColumns={[
            'repeat(0, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]}
          fontSize="15px"
          gap={5}
        >
          <GridItem colSpan={[1, 2, 2]} w="100%">
            {cart ? (
              cart.map((item, index) => {
                total += parseFloat(item.products.price) * cart[index].quantity;
                return (
                  <Card direction="row" mt={5} key={index}>
                    <Flex justify="center" align="center" p={5}>
                      <Image
                        src={item.products.image}
                        alt={item.products.title}
                        w={[50, '40px', 100]}
                        h={[50, '40px', 100]}
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
                        w={['150px', '150px', '250px']}
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
                            readOnly={true}
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
                    <Flex>
                      <CloseButton size="sm" onClick={() => deleteCart()} />
                    </Flex>
                  </Card>
                );
              })
            ) : (
              <Heading>You don't have anything in cart</Heading>
            )}
          </GridItem>
          <GridItem colSpan={[1, 1, 1]}>
            <Card mt={5}>
              <CardBody>
                <Heading
                  textAlign="center"
                  fontSize="18px"
                  textTransform="uppercase"
                  letterSpacing={1}
                >
                  You have ({cart.length}) items
                </Heading>
              </CardBody>
              <Flex align="center" justify="space-between" m="0 5%">
                <Text textAlign="right" fontSize="16px">
                  Item sub-total:
                </Text>
                <Text textAlign="left" fontSize="16px">
                  ${total.toFixed(2)}
                </Text>
              </Flex>
              <FormControl overflow="hidden" isInvalid={errors}>
                <FormHelperText>Enter your promo here</FormHelperText>
                <Flex justify="center">
                  <InputGroup w="90%" size="sm">
                    <Input onChange={e => setPromo(e.target.value)} />
                    <InputRightElement w="60px">
                      <Button size="sm" onClick={() => handlePromo()}>
                        Apply{' '}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
                {!errors ? (
                  <></>
                ) : (
                  <FormErrorMessage m="0 5%">
                    Sorry, you input wrong promo
                  </FormErrorMessage>
                )}
              </FormControl>
              {errors === false ? (
                <Text fontSize="14px" textAlign="left" color="green" m="0 5%">
                  Yeaaay! You have applied promo
                </Text>
              ) : (
                <></>
              )}
              <Flex align="center" justify="space-between" m={5}>
                <Text textAlign="right" fontSize="16px">
                  Estimated Total:
                </Text>
                <Text textAlign="left" fontSize="16px">
                  ${(total - parseFloat(discount)).toFixed(2)}
                </Text>
              </Flex>
            </Card>

            {user !== '' && cart.length !== 0 ? (
              <Flex justify="right" mt={5}>
                <ButtonGroup
                  isAttached
                  variant="solid"
                  onClick={() => navigate('/checkout')}
                  colorScheme="green"
                  size="sm"
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
              <></>
            )}
            {user === '' && cart.length !== 0 ? (
              <Flex justify="right" mt={5}>
                <ButtonGroup
                  isAttached
                  variant="solid"
                  onClick={() => navigate('/checkout-method')}
                  colorScheme="green"
                  size="sm"
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
              <></>
            )}
          </GridItem>
        </Grid>

        <AlertLogin isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Box>
      <Footer />
    </>
  );
}
