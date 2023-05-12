import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../actions/Actions';
import { useAuthDispatch, useAuthState } from '../actions/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/Firebase';
import { doc, getDocs, collection } from 'firebase/firestore';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { user } = useAuthState();
  const [spin, setSpin] = useState(false);
  // console.log(user, 'ini context');
  // console.log(isLogin, 'ini isLogin');
  const [users, setUsers] = useState({
    email: '',
  });
  const getUser = async () => {
    const ref = await getDocs(collection(db, 'user'));
    console.log(ref, 'docsnap');
    // if (docSnap.includes(user.email)) {
    //   // LoginUser(dispatch, user);
    //   //
    // } else {
    //   console.log('No such document!');
    // }
  };

  const handleLogin = async () => {
    setSpin(true);
    signInWithEmailAndPassword(auth, users.email, users.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // ...
        if (user) {
          navigate('/');
          setSpin(false);
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setSpin(false);
      });
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
              {spin ? (
                <Spinner />
              ) : (
                <Button onClick={() => handleLogin()}>Login</Button>
              )}
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
