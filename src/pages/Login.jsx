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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../actions/Actions';
import { useAuthDispatch, useAuthState } from '../actions/Context';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { user } = useAuthState();

  // console.log(isLogin, 'ini context')
  const [users, setUsers] = useState({
    email: '',
  });
  const handleLogin = () => {
    LoginUser(dispatch, users);
  };
  useEffect(() => {
    if (user !== '') {
      return navigate('/');
    }
  });
  return (
    <>
      <Flex justify="center" h="100vh" align="center">
        <Box>
          <Box p={20}>
            <Heading
              textTransform="uppercase"
              letterSpacing={10}
              pb={10}
              fontSize="28px"
            >
              Olimall
            </Heading>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="text"
                onChange={e => setUsers({ ...users, email: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={e => setUsers({ ...users, password: e.target.value })}
              />
            </FormControl>
            <FormControl mt={5}>
              <Button onClick={() => handleLogin()}>Login</Button>
            </FormControl>
          </Box>
          <Text
            p={5}
            mt={-20}
            textTransform="uppercase"
            fontSize="16px"
            letterSpacing={2}
          >
            don't have an account?
            <Text
              fontWeight="bold"
              cursor="pointer"
              onClick={() => navigate('/signup')}
            >
              register here
            </Text>
          </Text>
        </Box>
      </Flex>
    </>
  );
}
