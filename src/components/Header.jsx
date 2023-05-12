import {
  Button,
  Flex,
  Heading,
  Spacer,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LogoutUser } from '../actions/Actions';
import { useNavigate } from 'react-router-dom';
import {
  useAuthDispatch,
  useAuthState,
  useCartState,
} from '../actions/Context';
import { FaSearch } from 'react-icons/fa';
import { BsCartFill } from 'react-icons/bs';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { auth } from '../config/Firebase';
import { signOut } from 'firebase/auth';

// import { ColorModeSwitcher } from '../ColorModeSwitcher'
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { user } = useAuthState();
  const { cart } = useCartState();
  // console.log(cart, 'ini cart header')
  // console.log(user, 'ini login')
  const [searchName, setSearchName] = useState('');
  // console.log(searchName, 'ini search name header')
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/login');
      })
      .catch(error => {
        // An error happened.
      });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = auth.currentUser;
  let name = '';
  if (userProfile !== null) {
    userProfile.providerData.forEach(profile => {
      name = profile.displayName;
    });
  }
  console.log(name, 'ini name');
  return (
    // <Box >
    <Flex
      bgColor="white"
      boxShadow="0 4px 6px -1px rgb(0 0 0 / 7%)"
      p={2}
      position="sticky"
      top="0"
      zIndex={555}
      justify={{ base: 'left', md: 'center' }}
      align={{ base: 'left', md: 'center' }}
      wrap="wrap"
      w="100%"
    >
      <Flex
        justify={{ base: 'left', md: 'center' }}
        align={{ base: 'left', md: 'center' }}
      >
        <Box display={{ base: 'gird', md: 'none' }}>
          <IconButton
            onClick={isOpen ? onClose : onOpen}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Menu"
          />
        </Box>
        <Box display={{ base: 'none', md: 'block' }}>
          <Heading textTransform="uppercase" letterSpacing={8}>
            olimall
          </Heading>
        </Box>
        <Box
          display={{ base: isOpen ? 'auto' : 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
        >
          {/* {category.map((catalogue, index) => (
            <Button
              bgColor="transparent"
              onClick={() => navigate(`/${catalogue}`)}
              fontSize="15px"
              key={index}
            >
              {catalogue}
            </Button>
          ))} */}

          <Button
            bgColor="transparent"
            onClick={() => navigate(`/women's clothing`)}
            fontSize="15px"
          >
            Women
          </Button>
          <Button
            bgColor="transparent"
            onClick={() => navigate("/men's clothing")}
            fontSize="15px"
          >
            Men
          </Button>
          <Button
            bgColor="transparent"
            onClick={() => navigate('/jewelery')}
            fontSize="15px"
          >
            Jewelery
          </Button>
          <Button
            bgColor="transparent"
            onClick={() => navigate('/electronics')}
            fontSize="15px"
          >
            Electronics
          </Button>
          <Spacer display={{ base: 'none', md: 'block' }} />
          <Spacer display={{ base: 'none', md: 'block' }} />
          <InputGroup w={['100%', '50%', '30%']}>
            <Input
              placeholder="Search..."
              onChange={e => setSearchName(e.target.value)}
            />
            <InputRightElement w={['12%', '50%', '18%']}>
              <Button
                onClick={() =>
                  navigate('/search', { state: { name: searchName } })
                }
              >
                <FaSearch />
              </Button>
            </InputRightElement>
          </InputGroup>
          <Spacer display={{ base: 'none', md: 'block' }} />
          <Button
            bgColor="transparent"
            onClick={() => navigate('/')}
            fontSize="15px"
          >
            Home
          </Button>
          <Button
            bgColor="transparent"
            display={userProfile !== null ? 'block' : 'none'}
            onClick={() => navigate('/setting')}
            fontSize="15px"
          >
            Setting
          </Button>
          <Button bgColor="transparent" onClick={() => navigate('/cart')}>
            <BsCartFill /> &nbsp;
            <sup>{cart === '' || cart.length === 0 ? 0 : cart.length}</sup>
          </Button>
          <Button
            bgColor="transparent"
            onClick={() => handleLogout()}
            fontSize="15px"
          >
            {userProfile !== null ? `Hi, ${name}` : 'LogIn'}
          </Button>
        </Box>
      </Flex>
      {/* <ColorModeSwitcher /> */}
    </Flex>
    // </Box>
  );
}
