import { CheckIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import BackButton from '../components/BackButton';
import ConfirmPaymentModal from '../components/ConfirmPaymentModal';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function PaymentPage() {
  const { total } = useLocation().state;
  const [bank, setBank] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();
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
  return (
    <>
      <Header />
      <Heading
        p={5}
        textTransform="uppercase"
        letterSpacing={5}
        fontSize="28px"
      >
        Payment
      </Heading>
      <Box p={10}>
        <Flex
          justifyContent="center"
          alignItems="center"
          textTransform="uppercase"
        >
          <Box>
            <Heading>Total: ${total.toFixed(2)}</Heading>
            <FormControl>
              <FormLabel>Choose your payment</FormLabel>
              <RadioGroup onChange={e => setBank(e)}>
                <HStack>
                  <Radio value="bca">bca</Radio>
                  <Radio value="bri">bri</Radio>
                  <Radio value="bni">bni</Radio>
                  <Radio value="mandiri">mandiri</Radio>
                </HStack>
              </RadioGroup>
              <FormHelperText>payment only with virtual account</FormHelperText>
            </FormControl>
          </Box>
        </Flex>
        <br />
        <Box m={5}>
          <Text>Payment code:</Text>
          {bank === 'bca' ? <Heading>{makeid(10)}</Heading> : <></>}
          {bank === 'bri' ? <Heading>{makeid(15)}</Heading> : <></>}
          {bank === 'bni' ? <Heading>{makeid(20)}</Heading> : <></>}
          {bank === 'mandiri' ? <Heading>{makeid(8)}</Heading> : <></>}
        </Box>
        <Flex justify="space-between">
          <BackButton />
          <ButtonGroup
            isAttached
            variant="solid"
            onClick={onOpen}
            colorScheme="green"
          >
            <Button textTransform="uppercase" letterSpacing={2}>
              confirm payment
            </Button>
            <IconButton
              aria-label="Add to friends"
              icon={<QuestionOutlineIcon />}
            />
          </ButtonGroup>
        </Flex>
      </Box>
      <ConfirmPaymentModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Footer />
    </>
  );
}
