import { Button, Flex, Heading, Spacer, Box, InputGroup, Input, InputRightElement, Tag } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LogoutUser } from "../actions/Actions";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState, useCartState } from "../actions/Context";
import { FaSearch } from "react-icons/fa";
// import { ColorModeSwitcher } from '../ColorModeSwitcher'
export default function Header() {
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
    useEffect(() => {
        if (user === '') {
            return navigate('/')
        }
    }, [user])
    // console.log(cart, 'ini carttt')
    return (
        <Box position='sticky' top='0' zIndex={555}>
            <Flex bgColor='gray.700' p={5}>
                <Heading textTransform='uppercase' letterSpacing={8}>olimall</Heading>
                <Spacer />
                <Button bgColor="transparent" onClick={() => navigate("/women's clothing")}>Women</Button>
                <Button bgColor="transparent" onClick={() => navigate("/men's clothing")}>Men</Button>
                <Button bgColor="transparent" onClick={() => navigate('/jewelery')}>Jewelery</Button>
                <Button bgColor="transparent" onClick={() => navigate('/electronics')}>Electronics</Button>
                <Spacer />
                <Spacer />
                <InputGroup w='md'>
                    <Input placeholder="Search..." onChange={(e)=>setSearchName(e.target.value)}/>
                    <InputRightElement w='48px' >
                        <Button onClick={() => navigate('/search',{state:{name:searchName}})}>
                            <FaSearch />
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Spacer />
                <Button bgColor="transparent" onClick={() => navigate('/dashboard')}>Home</Button>
                <Button bgColor='transparent' onClick={() => navigate('/cart')}>Cart <Tag>{cart === '' || cart.length ===  0 ? 0 : cart.length}</Tag></Button>
                <Button bgColor='transparent' onClick={() => handleLogout()}>LogOut</Button>
                {/* <ColorModeSwitcher /> */}
            </Flex>
        </Box>

    )

}