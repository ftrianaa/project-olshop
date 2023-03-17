import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../components/AlertModal';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MethodCheckout() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
              checkout as guest
            </Button>
          </GridItem>
        </Grid>
        <br />
        <Flex justify="space-between">
          <BackButton />
          {/* {!isErrorAddress && !isErrorName && !isErrorPhone ? (
            <ButtonGroup
              isAttached
              variant="solid"
              onClick={() => navigate('/confirm', { state: { user: user } })}
              colorScheme="green"
            >
              <Button textTransform="uppercase" letterSpacing={2}>
                confirm
              </Button>
              <IconButton
                aria-label="Add to friends"
                icon={<ArrowForwardIcon />}
              />
            </ButtonGroup>
          ) : (
            <ButtonGroup
              isAttached
              variant="solid"
              onClick={onOpen}
              colorScheme="green"
            >
              <Button textTransform="uppercase" letterSpacing={2}>
                confirm
              </Button>
              <IconButton
                aria-label="Add to friends"
                icon={<ArrowForwardIcon />}
              />
            </ButtonGroup>
          )}
          <AlertModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
