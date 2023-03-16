import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Spacer,
  Stack,
  Tag,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { IoMdPerson } from 'react-icons/io';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AddCart } from '../actions/Actions';
import {
  useAuthState,
  useCartDispatch,
  useCartState,
} from '../actions/Context';
import AlertLogin from '../components/AlertLogin';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Api from '../config/Config';

export default function DescriptionPage() {
  const { category } = useParams();
  const { data } = useLocation().state;
  const navigate = useNavigate();
  const dispatch = useCartDispatch();
  const { cart } = useCartState();
  const { user } = useAuthState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  let quantity = 1;
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    try {
      const res = await Api.get(`/products?limit=5`);
      // console.log(res, 'ini response')
      setProduct(res.data);
    } catch (error) {
      throw error;
    }
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
  const handleBuy = product => {
    let newArr = {
      products: product,
      quantity: quantity,
    };
    AddCart(dispatch, [newArr]);
    if (user || user === undefined) {
      navigate('/form-order');
      console.log('masuk sini ga');
    } else {
      onOpen();
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  // console.log(data, 'ini product')
  return (
    <>
      <Header />
      <Box p={10}>
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon color="gray.500" />}
          textTransform="capitalize"
          fontSize="15px"
        >
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate(`/${category}`)}>
              {category}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              href="#"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              w={['100px', '230px', '230px']}
            >
              {data.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(3, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={6}
          mt={5}
          fontSize="15px"
        >
          <GridItem>
            <Flex justify="center" align="center">
              <Image
                src={data.image}
                w={[300, 300, 400]}
                h={[300, 300, 400]}
                objectFit="contain"
              />
            </Flex>
          </GridItem>
          <GridItem textAlign="left" colSpan={[1, 1, 2]}>
            <Stack>
              <Heading fontSize="28px">
                {data.title} <Tag mt={3}>{data.category}</Tag>
              </Heading>
              <Flex align="center" m={['10px 0px', 0, 0]}>
                <FaStar />
                <Text>
                  {data.rating.rate} (rating {data.rating.count})
                </Text>
              </Flex>
              <Heading m={['10px 0px', 0, 0]} fontSize="28px">
                ${data.price}
              </Heading>
              <ButtonGroup>
                <Button onClick={() => handleBuy(data)} size="sm">
                  Buy
                </Button>
                <Button onClick={() => handleCart(data)} size="sm">
                  Add to Cart
                </Button>
              </ButtonGroup>
              <Text>{data.description}</Text>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
      <Divider />
      <Flex p={[2, 2, 5]} align="center" justify="center" flexWrap="wrap">
        {product.map((item, index) => (
          <Card
            w={['40%', '40%', '16.5%']}
            m={[2, 2, 5]}
            borderRadius="10px"
            key={index}
            overflow="hidden"
            fontSize="15px"
          >
            <CardBody>
              <Flex justifyContent="center" align="center" mt={5}>
                <Image
                  src={item.image}
                  w={[100, 120, 120]}
                  h={[100, 120, 120]}
                  objectFit="contain"
                />
              </Flex>
              <Text
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                _hover={{ cursor: 'pointer', textDecor: 'underline' }}
                onClick={() =>
                  navigate(`/product/${item.category}/${item.id}`, {
                    state: { data: item },
                  })
                }
                mt={5}
                mb={2}
                fontWeight="bold"
              >
                {item.title}
              </Text>
              <Text align="center">${item.price}</Text>
              <Flex align="center" justify="center">
                <FaStar />
                {item.rating.rate} | <IoMdPerson /> {item.rating.count}{' '}
              </Flex>
            </CardBody>
            <CardFooter>
              <Button onClick={() => handleCart(item)} w="100%" fontSize="15px">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Flex>
      <AlertLogin isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Footer />
    </>
  );
}
