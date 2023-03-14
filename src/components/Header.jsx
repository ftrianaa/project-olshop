import { Button, Flex, Heading, Spacer, Box, InputGroup, Input, InputRightElement, Tag, useDisclosure, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LogoutUser } from "../actions/Actions";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState, useCartState } from "../actions/Context";
import { FaSearch } from "react-icons/fa";
import { BsCartFill } from 'react-icons/bs'
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

// import { ColorModeSwitcher } from '../ColorModeSwitcher'
export default function Header() {
    const [stat, setStat] = useState('LogIn')
    const navigate = useNavigate()
    const dispatch = useAuthDispatch()
    const { user } = useAuthState()
    const { cart } = useCartState()
    // console.log(cart, 'ini cart header')
    // console.log(user, 'ini login')
    const [searchName, setSearchName] = useState('')
    // console.log(searchName, 'ini search name header')
    const handleLogout = () => {
        LogoutUser(dispatch)
    }
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (user === undefined || user) {
            setStat('LogOut')
        }
    })


    return (
        // <Box >
            <Flex bgColor='white' boxShadow="0 4px 6px -1px rgb(0 0 0 / 7%)" p={5} position='sticky' top='0' zIndex={555} justify="space-between" wrap="wrap" w='100%' >
                <Box display={{ base: "gird", md: "none" }}>
                    <IconButton
                        onClick={isOpen ? onClose : onOpen}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        variant="outline"
                        aria-label="Menu"
                    />
                </Box>
                <Box display={{ base: "none", md: "block" }}>
                    <Heading textTransform='uppercase' letterSpacing={8}>olimall</Heading>
                </Box>
                <Box
                    display={{ base: isOpen ? "auto" : "none", md: "flex" }}
                    width={{ base: "full", md: "auto" }}
                    alignItems="center"
                    flexGrow={1}
                >
                    <Button bgColor="transparent" onClick={() => navigate("/women's clothing")}>Women</Button>
                    <Button bgColor="transparent" onClick={() => navigate("/men's clothing")}>Men</Button>
                    <Button bgColor="transparent" onClick={() => navigate('/jewelery')}>Jewelery</Button>
                    <Button bgColor="transparent" onClick={() => navigate('/electronics')}>Electronics</Button>
                    <Spacer display={{base:'none', md:'block'}}/>
                    <Spacer display={{base:'none', md:'block'}}/>
                    <InputGroup w={['100%','50%','30%']}>
                        <Input placeholder="Search..." onChange={(e) => setSearchName(e.target.value)} />
                        <InputRightElement w={['12%','50%','18%']} >
                            <Button onClick={() => navigate('/search', { state: { name: searchName } })}>
                                <FaSearch />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Spacer display={{base:'none', md:'block'}}/>
                    <Button bgColor="transparent" onClick={() => navigate('/')}>Home</Button>
                    <Button bgColor='transparent' onClick={() => navigate('/cart')}> <BsCartFill /> &nbsp; <sup>{cart === '' || cart.length === 0 ? 0 : cart.length}</sup></Button>
                    {user === undefined || user ?
                        <Button bgColor='transparent' onClick={() => handleLogout()}>{stat}</Button>
                        :
                        <Button bgColor='transparent' onClick={() => navigate('/login')}>{stat}</Button>
                    }
                </Box>
                <Spacer />

                {/* <ColorModeSwitcher /> */}
            </Flex>
        // </Box>

    )

}