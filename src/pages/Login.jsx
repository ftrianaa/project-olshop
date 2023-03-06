import { Box, Button, FormControl, FormLabel, Heading, Input, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../actions/Actions";
import { useAuthDispatch, useAuthState } from "../actions/Context";

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useAuthDispatch()
    // console.log(isLogin, 'ini context')
    const [user, setUser] = useState({
        email: ''
    })
    // console.log(user, 'ini user')
    const handleLogin = () => {
        // console.log(user, 'ini user')
        LoginUser(dispatch, user)
    }
    const { isLogin } = useAuthState()
    // console.log(isLogin)
    useEffect(() => {
        if (isLogin === true) {
            return navigate('/dashboard')
        }
    }, [isLogin])
    return (
        <Flex justify='center'>
        <Box p={20} w='100vh'>
            <Heading textTransform='uppercase' letterSpacing={10} pb={10}>Olimall</Heading>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='text' onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </FormControl>
            <FormControl pt={5}>
                <Button onClick={() => handleLogin()} >Login</Button>
            </FormControl>
            <Text p={5} textTransform="uppercase" fontSize='16px' letterSpacing={2}>don't have an account?<Text fontWeight='bold' cursor='pointer' onClick={()=>navigate('/signup')}>register here</Text></Text>
        </Box>
        </Flex>
    )
}