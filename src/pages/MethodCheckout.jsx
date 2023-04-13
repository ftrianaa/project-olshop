import { Box, Button, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MethodCheckout() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Heading
        p={5}
        textTransform="uppercase"
        letterSpacing={5}
        fontSize="28px"
      >
        Checkout
      </Heading>
      <Box p={10}>
        <Grid templateColumns="repeat(2,1fr)">
          <GridItem>
            <Heading
              p={5}
              textTransform="uppercase"
              letterSpacing={5}
              fontSize="28px"
            >
              Sign In
            </Heading>
            <Button onClick={() => navigate('/login')}>Have an account</Button>
          </GridItem>
          <GridItem>
            <Heading
              p={5}
              textTransform="uppercase"
              letterSpacing={5}
              fontSize="28px"
            >
              Guest checktout
            </Heading>
            <Button onClick={() => navigate('/checkout')}>
              Checkout as guest
            </Button>
          </GridItem>
        </Grid>
        <br />
        <Flex justify="space-between">
          <BackButton />
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
