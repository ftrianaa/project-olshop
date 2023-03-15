import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DescriptionModal from '../components/DescriptionModal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Api from '../config/Config';
import { FaStar } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { useCartDispatch, useCartState } from '../actions/Context';
import { AddCart } from '../actions/Actions';
import { useNavigate } from 'react-router-dom';
export default function Jewelery() {
  const navigate = useNavigate();
  const dispatch = useCartDispatch();
  const { cart } = useCartState();
  const [quantity, setQuantity] = useState(1);
  const [jeweleryProduct, setJeweleryProduct] = useState([]);
  const [item, setItem] = useState([]);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const getProduct = async () => {
    try {
      const res = await Api.get(`/products`);
      // console.log(res, 'ini response')
      setJeweleryProduct(res.data);
    } catch (error) {
      throw error;
    }
  };
  const handleModalDesc = product => {
    onOpen();
    setItem(product);
    console.log(item, 'ini item db');
  };
  const handleCart = async product => {
    let newCart = cart;
    newCart = newCart.findIndex(item => item.products.id === product.id);
    if (newCart === -1) {
      let newArr = {
        products: product,
        quantity: quantity,
      };
      await AddCart(dispatch, [...cart, newArr]);
    } else {
      cart[newCart].quantity = cart[newCart].quantity + 1;
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Header />
      <Heading
        p={5}
        textTransform="uppercase"
        letterSpacing={5}
        fontSize="28px"
      >
        Jewelery's space
      </Heading>

      <Box m={[5, 10, 10]} fontSize="15px">
        <Wrap justify="center" align="center">
          {jeweleryProduct
            .filter(item => item.category === 'jewelery')
            .map((product, index) => (
              <Card key={index} w={[150, 200, 250]}>
                <CardBody>
                  <Image
                    src={product.image}
                    w={300}
                    h={200}
                    objectFit="contain"
                  />
                  <Heading
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    w={[100, 200, 218]}
                    p={['0px', '10px 20px', '10px 20px']}
                    fontSize="15px"
                  >
                    {product.title}
                  </Heading>
                  <Text>${product.price}</Text>
                </CardBody>
                <Flex justify="center" align="center">
                  <FaStar />
                  {product.rating.rate} | <IoMdPerson /> {product.rating.count}{' '}
                </Flex>
                <CardFooter display={['block', 'flex', 'flex']}>
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/product/${product.category}/${product.id}`, {
                        state: { data: product },
                      })
                    }
                  >
                    Description
                  </Button>
                  <Spacer mt={[2, 0, 0]} />
                  <Button onClick={() => handleCart(product)} size="sm">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </Wrap>
      </Box>
      <Footer />
      <DescriptionModal isOpen={isOpen} onClose={onClose} item={item} />
    </>
  );
}
