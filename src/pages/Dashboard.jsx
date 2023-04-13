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
  // useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Api from '../config/Config';
import { FaStar } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
// import DescriptionModal from '../components/DescriptionModal';
import { AddCart } from '../actions/Actions';
import { useCartDispatch, useCartState } from '../actions/Context';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useCartDispatch();
  const [products, setProducts] = useState([]);
  // const [item, setItem] = useState([]);
  const { cart } = useCartState();
  let quantity = 1;
  // const [cart, setCart] = useState([])
  // const { onOpen, isOpen, onClose } = useDisclosure();

  const getProduct = async () => {
    try {
      const res = await Api.get('/products');
      setProducts(res.data);
    } catch (error) {
      throw error;
    }
  };

  // const handleModalDesc = product => {
  //   onOpen();
  //   setItem(product);
  // console.log(item, 'ini item db')
  // };
  // console.log(cart, "cart di dashboard")

  const handleCart = async product => {
    // console.log("ini handle cart", cart.cart, product);
    // let newArr = [];
    // console.log(newArr, "newArr")
    // console.log('masuk sini ga')
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
    // AddCart(dispatch, [...cart, newArr])

    // let send = [arr]
    // arr.push({ ...newArr })

    // setQuantity([...quantity,...arr])
    // let hasil = arr
    // console.log(quantity, 'ini hasil')

    // await AddCart(dispatch, [...cart, newArr]);

    // console.log(cart.cart, 'ini carttt di db')
  };
  // console.log(cart, "cart setelah click dashboard")

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
        Dashboard
      </Heading>
      <Box m={[5, 10, 10]} fontSize="15px">
        <Wrap justify="center" align="center">
          {products.map((product, index) => (
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
                  p={['0px', '10px 20px', '10px']}
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
                  fontSize="15px"
                >
                  Description
                </Button>
                <Spacer mt={[2, 0, 0]} />
                <Button
                  onClick={() => handleCart(product)}
                  fontSize="15px"
                  size="sm"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Wrap>
      </Box>
      <Footer />
      {/* <DescriptionModal isOpen={isOpen} onClose={onClose} item={item} /> */}
    </>
  );
}
