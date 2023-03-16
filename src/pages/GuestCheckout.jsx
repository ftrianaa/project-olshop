import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function GuestCheckout() {
  const [user, setUser] = useState({
    name: '',
    telephone: 0,
    address: '',
  });
  const isErrorName = user.name === '';
  const isErrorPhone = user.telephone === 0;
  const isErrorAddress = user.address === '';
  return (
    <>
      <Header />
      <Box p={10}>
        <Grid templateColumns="repeat(3,1fr)" gap={10} fontSize="13px">
          <GridItem colSpan={2}>
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
                  <RadioGroup fontSize="13px">
                    <Stack>
                      <Flex align="center" justify="space-between">
                        <Radio value="1">
                          <Text textAlign="right" fontSize="15px">
                            Same Day
                          </Text>
                        </Radio>
                        <Text textAlign="left" fontSize="15px">
                          $50
                        </Text>
                      </Flex>
                      <Flex align="center" justify="space-between">
                        <Radio value="2">
                          <Text textAlign="right" fontSize="15px">
                            Express
                          </Text>
                        </Radio>
                        <Text textAlign="left" fontSize="15px">
                          $25
                        </Text>
                      </Flex>{' '}
                      <Flex align="center" justify="space-between">
                        <Radio value="3">
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
                  <Button w="100%">Continue to Payment</Button>
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
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
