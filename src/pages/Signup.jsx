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
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../config/Firebase';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
export default function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    name: '',
    birthdate: '',
  });

  // const addUser = async user => {
  //   console.log(user, 'ini userid');
  //   try {
  //     const docRef = await addDoc(collection(db, 'user'), {
  //       name: data.name,
  //       email: data.email,
  //       birthdate: data.birthdate,
  //       role: 'member',
  //       uid: user,
  //     });
  //     console.log('Document written with ID: ', docRef.id);
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  // };
  const addUser = async () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        const userRef = doc(db, 'user', uid);
        // save user data to Firestore
        setDoc(userRef, {
          name: data.name,
          email: data.email,
          birthdate: data.birthdate,
          role: 'member',
          uid: uid,
        })
          .then(() => {
            navigate('/');
            console.log('User data saved to Firestore');
          })
          .catch(error => {
            console.error('Error saving user data to Firestore:', error);
          });

        // retrieve user data from Firestore
        // getDoc(userRef)
        //   .then(doc => {
        //     if (doc.exists()) {
        //       const userData = doc.data();
        //       console.log('User data retrieved from Firestore:', userData);
        //     } else {
        //       console.log('No user data found in Firestore');
        //     }
        //   })
        //   .catch(error => {
        //     console.error('Error retrieving user data from Firestore:', error);
        //   });
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  };
  const updateUser = () => {
    updateProfile(auth.currentUser, {
      displayName: data.name,
    })
      .then(() => {
        // Profile updated!
        console.log('User Updated in Firebase Authentication');
        // navigate('/');
      })
      .catch(error => {
        // An error occurred
        // ...
      });
  };
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // const name = console.log(userCredential, 'USECRED');
        // ...
        if (user) {
          addUser();
          updateUser();
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, 'error code');
        console.log(errorMessage, 'error mess');
      });

    // SignUp(dispatch, data);
    // navigate('/');
  };

  return (
    <Flex justify="center" h="100vh" align="center">
      <Box>
        <Box p={20}>
          <Heading fontSize="20px" fontWeight="200">
            Get Started With
          </Heading>
          <Heading
            textTransform="uppercase"
            letterSpacing={10}
            pb={10}
            fontSize="28px"
          >
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
