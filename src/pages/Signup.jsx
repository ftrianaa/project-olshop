import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../actions/Actions';
import { useAuthDispatch } from '../actions/Context';

export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    name: '',
    birthdate: '',
  });
  const dispatch = useAuthDispatch();
  const handleSignup = () => {
    SignUp(dispatch, data);
    navigate('/');
  };
  return (
    <Flex justify="center" h="100vh" align="center">
      <Box>
        <Box p={20}>
          <Heading fontSize="20px" fontWeight="200">
            Get Started With
          </Heading>
          <Heading textTransform="uppercase" letterSpacing={10} pb={10}>
            Olimall
          </Heading>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              onChange={e => setData({ ...data, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              onChange={e => setData({ ...data, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Birthdate</FormLabel>
            <Input
              type="date"
              onChange={e => setData({ ...data, birthdate: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={e => setData({ ...data, password: e.target.value })}
            />
          </FormControl>
          <FormControl pt={5}>
            <Button onClick={() => handleSignup()}>Signup</Button>
          </FormControl>
        </Box>
        <Text
          p={5}
          textTransform="uppercase"
          fontSize="16px"
          letterSpacing={2}
          mt={-20}
        >
          have an account?
          <Text
            fontWeight="bold"
            cursor="pointer"
            onClick={() => navigate('/login')}
          >
            login here
          </Text>
        </Text>
      </Box>
    </Flex>
  );
}
