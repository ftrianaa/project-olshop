import { Box, Button, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../actions/Actions";
import { useAuthDispatch, useAuthState } from "../actions/Context";

export default function Login() {
    const navigate = useNavigate()
    const { isLogin } = useAuthState()
    const [user, setUser] = useState({
        email: '',
        isLogin: false
    })
    const dispatch = useAuthDispatch()
    const handleLogin = () => {
        LoginUser(dispatch, user)
    }
    useEffect(() => {
        if (!isLogin) {
            navigate('/dashboard')
        }
    }, [])
    return (
        <Box p={20}>
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
        </Box>
    )
}