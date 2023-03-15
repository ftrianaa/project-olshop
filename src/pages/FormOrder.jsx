import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../components/AlertModal';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function FormOrder() {
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
        Form order
      </Heading>
      <Box p={10}>
        <Flex align="center" justify="center">
          <Box w="90%">
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
                onChange={e => setUser({ ...user, telephone: e.target.value })}
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
                onChange={e => setUser({ ...user, address: e.target.value })}
              />
              {isErrorAddress ? (
                <FormErrorMessage fontSize="13px">
                  *Address is required.
                </FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
        </Flex>
        <br />
        <Flex justify="space-between">
          <BackButton />
          {!isErrorAddress && !isErrorName && !isErrorPhone ? (
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
          <AlertModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Flex>
      </Box>
      <Footer />
    </>
  );
}
