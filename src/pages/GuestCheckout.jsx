import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCartState } from '../actions/Context';
import ConfirmPaymentModal from '../components/ConfirmPaymentModal';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function GuestCheckout() {
  const [delivery, setDelivery] = useState(0);
  const [payment, setPayment] = useState(false);
  const [bank, setBank] = useState('');
  const [buttonPayment, setButtonPayment] = useState(false);
  const { cart, discount } = useCartState();
  // console.log(discount, 'ini discount di guest CO');
  let total = 0;
  const [user, setUser] = useState({
    name: '',
    telephone: 0,
    address: '',
  });
  const [virtualAccount, setVirtualAccount] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();
  const isErrorName = user.name === '';
  const isErrorPhone = user.telephone === 0;
  const isErrorAddress = user.address === '';
  const handlePayment = () => {
    if (!isErrorName && !isErrorPhone && !isErrorAddress && delivery) {
      setPayment(true);
    } else {
      setPayment(false);
    }
  };
  function makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  const handleButtonPayment = () => {
    if (bank !== '') {
      setButtonPayment(true);
      setPayment(false);
      if (bank === 'bri') {
        setVirtualAccount(makeid(10));
      } else if (bank === 'mandiri') {
        setVirtualAccount(makeid(15));
      } else if (bank === 'bca') {
        setVirtualAccount(makeid(8));
      } else {
        setVirtualAccount(makeid(12));
      }
    }
  };
  const handleBackToPayment = () => {
    setPayment(true);
    setButtonPayment(false);
    setBank('');
  };
  return (
    <>
      <Header />
      <Box p={10}>
        <Grid
          templateRows={['repeat(1, 1fr)', 'repeat(0, 1fr)', 'repeat(0, 1fr)']}
          templateColumns={[
            'repeat(0, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={10}
          fontSize="13px"
        >
          <GridItem colSpan={[1, 2, 2]}>
            <Stack>
              <Card>
                <CardBody>
                  <Heading
                    fontSize="18px"
                    textTransform="uppercase"
                    letterSpacing={1}
                  >
                    Delivery Method
                  </Heading>
                  <RadioGroup fontSize="13px" onChange={e => setDelivery(e)}>
                    <Stack>
                      <Flex align="center" justify="space-between">
                        <Radio value="50" isInvalid={!delivery}>
                          <Text textAlign="right" fontSize="15px">
                            Same Day
                          </Text>
                        </Radio>
                        <Text textAlign="left" fontSize="15px">
                          $50
                        </Text>
                      </Flex>
                      <Flex align="center" justify="space-between">
                        <Radio value="25" isInvalid={!delivery}>
                          <Text textAlign="right" fontSize="15px">
                            Express
                          </Text>
                        </Radio>
                        <Text textAlign="left" fontSize="15px">
                          $25
                        </Text>
                      </Flex>{' '}
                      <Flex align="center" justify="space-between">
                        <Radio value="15" isInvalid={!delivery}>
                          <Text textAlign="right" fontSize="15px">
                            Standart
                          </Text>
                        </Radio>
                        <Text textAlign="left" fontSize="15px">
                          $15
                        </Text>
                      </Flex>{' '}
                    </Stack>
                  </RadioGroup>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Heading
                    fontSize="18px"
                    textTransform="uppercase"
                    letterSpacing={1}
                  >
                    Delivery Address
                  </Heading>
                  <FormControl isInvalid={isErrorName}>
                    <FormLabel fontSize="15px">Full Name*</FormLabel>
                    <Input
                      type="text"
                      onChange={e => setUser({ ...user, name: e.target.value })}
                    />
                    {isErrorName ? (
                      <FormErrorMessage fontSize="13px">
                        *Fullname is required.
                      </FormErrorMessage>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                  <FormControl isInvalid={isErrorPhone}>
                    <FormLabel fontSize="15px">Telephone*</FormLabel>
                    <Input
                      type="number"
                      onChange={e =>
                        setUser({ ...user, telephone: e.target.value })
                      }
                    />
                    {isErrorPhone ? (
                      <FormErrorMessage fontSize="13px">
                        *Telephone is required.
                      </FormErrorMessage>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                  <FormControl isInvalid={isErrorAddress}>
                    <FormLabel fontSize="15px">Address*</FormLabel>
                    <Textarea
                      onChange={e =>
                        setUser({ ...user, address: e.target.value })
                      }
                    />
                    {isErrorAddress ? (
                      <FormErrorMessage fontSize="13px">
                        *Address is required.
                      </FormErrorMessage>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                </CardBody>
                <CardFooter>
                  <Button
                    w="100%"
                    onClick={() => handlePayment()}
                    isDisabled={!payment}
                  >
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardBody>
                  <Heading
                    fontSize="18px"
                    textTransform="uppercase"
                    letterSpacing={1}
                  >
                    Payment
                  </Heading>
                  {payment ? (
                    <>
                      <FormControl m={5}>
                        {/* <FormLabel textAlign="center">
                        Choose your payment
                      </FormLabel> */}
                        <RadioGroup onChange={e => setBank(e)}>
                          <Flex
                            align="center"
                            justify="center"
                            textTransform="uppercase"
                          >
                            <HStack>
                              <Radio value="bca" isInvalid={!bank}>
                                bca
                              </Radio>
                              <Radio value="bri" isInvalid={!bank}>
                                bri
                              </Radio>
                              <Radio value="bni" isInvalid={!bank}>
                                bni
                              </Radio>
                              <Radio value="mandiri" isInvalid={!bank}>
                                mandiri
                              </Radio>
                            </HStack>
                          </Flex>
                        </RadioGroup>
                        <FormHelperText fontSize="13px">
                          payment only with virtual account
                        </FormHelperText>
                      </FormControl>
                      <Flex justify="right">
                        <ButtonGroup
                          isAttached
                          variant="solid"
                          //  onClick={() => navigate('/checkout-method')}
                          colorScheme="green"
                          size="sm"
                        >
                          <Button
                            textTransform="uppercase"
                            letterSpacing={2}
                            onClick={() => handleButtonPayment()}
                          >
                            confirm
                          </Button>
                          <IconButton
                            aria-label="Add to friends"
                            icon={<ArrowForwardIcon />}
                          />
                        </ButtonGroup>
                      </Flex>
                    </>
                  ) : (
                    <></>
                  )}
                  {buttonPayment ? (
                    <>
                      <Box m={5}>
                        <Text fontSize="13px" textTransform="capitalize">
                          this is your Virtual Account number
                        </Text>
                        <Heading fontSize="18px" m={5}>
                          {virtualAccount}
                        </Heading>
                        <Divider m={3} />
                        <Text color="#4a5568">
                          If you already complete the payment, click confirm
                          button!
                        </Text>
                      </Box>
                      <Flex justify="space-between">
                        <ButtonGroup
                          isAttached
                          variant="solid"
                          //  onClick={() => navigate('/checkout-method')}
                          colorScheme="red"
                          size="sm"
                          onClick={() => handleBackToPayment()}
                        >
                          <IconButton
                            aria-label="Add to friends"
                            icon={<ArrowBackIcon />}
                          />
                          <Button textTransform="uppercase" letterSpacing={2}>
                            back
                          </Button>
                        </ButtonGroup>
                        <ButtonGroup
                          isAttached
                          variant="solid"
                          //  onClick={() => navigate('/checkout-method')}
                          colorScheme="green"
                          size="sm"
                          onClick={() => onOpen()}
                        >
                          <Button textTransform="uppercase" letterSpacing={2}>
                            confirm
                          </Button>
                          <IconButton
                            aria-label="Add to friends"
                            icon={<ArrowForwardIcon />}
                          />
                        </ButtonGroup>
                      </Flex>
                    </>
                  ) : (
                    <></>
                  )}
                </CardBody>
              </Card>
            </Stack>
          </GridItem>
          <GridItem>
            <Card>
              <CardBody>
                <Heading
                  fontSize="18px"
                  textTransform="uppercase"
                  letterSpacing={1}
                >
                  Cart
                </Heading>
                {cart ? (
                  cart.map((item, index) => {
                    total += item.products.price * item.quantity;
                    return (
                      <Box key={index}>
                        <Stack
                          spacing={3}
                          direction="row"
                          textAlign="left"
                          fontSize="15px"
                          m={[4, 4, 5]}
                        >
                          <Image
                            src={item.products.image}
                            w={['50px', '50px', '80px']}
                            h={['50px', '50px', '80px']}
                            objectFit="contain"
                          />

                          <Stack direction="column">
                            <Text
                              fontWeight="bold"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              w={['100px', '140px', '140px']}
                              overflow="hidden"
                            >
                              {item.products.title}
                            </Text>
                            <Text>${item.products.price}</Text>
                            <Flex justify="space-between">
                              <Text>Qty: {item.quantity}</Text>
                              <Text fontWeight="bold">
                                $
                                {(item.products.price * item.quantity).toFixed(
                                  2
                                )}
                              </Text>
                            </Flex>
                          </Stack>
                        </Stack>
                      </Box>
                    );
                  })
                ) : (
                  <></>
                )}
                <Divider mb={5} />
                <Flex justify="space-between">
                  <Text fontSize="15px" textAlign="right">
                    Items:
                  </Text>
                  <Text fontSize="15px" textAlign="right">
                    ${total.toFixed(2)}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="15px" textAlign="right">
                    Delivery:
                  </Text>
                  <Text fontSize="15px" textAlign="right">
                    ${delivery}
                  </Text>
                </Flex>
                {discount ? (
                  <Flex justify="space-between">
                    <Text fontSize="15px" textAlign="right">
                      Discount:
                    </Text>
                    <Text fontSize="15px" textAlign="right">
                      ${discount}
                    </Text>
                  </Flex>
                ) : (
                  <></>
                )}
                <Flex justify="space-between">
                  <Heading fontSize="18px" textAlign="right">
                    Estimated :
                  </Heading>
                  <Heading fontSize="18px" textAlign="right">
                    $
                    {(
                      parseFloat(total) +
                      parseFloat(delivery) -
                      parseFloat(discount)
                    ).toFixed(2)}
                  </Heading>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>
      <ConfirmPaymentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Footer />
    </>
  );
}
