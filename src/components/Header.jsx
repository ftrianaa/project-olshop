import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { useEffect } from "react";
import { LogoutUser } from "../actions/Actions";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../actions/Context";
// import { ColorModeSwitcher } from '../ColorModeSwitcher'
export default function Header() {
    const navigate = useNavigate()

    const dispatch = useAuthDispatch()
    const { isLogin } = useAuthState()
    // console.log(isLogin, 'ini logout')
    const handleLogout = () => {
        LogoutUser(dispatch)
    }
    useEffect(() => {
        if(isLogin === false) {
            return navigate('/')
        }
    }, [isLogin])
    return (
        <Flex bgColor='gray.700'>
            <Heading>olimall</Heading>
            <Spacer />
            <Button>Home</Button>
            <Button>Cart</Button>
            <Button onClick={() => handleLogout()}>LogOut</Button>
            {/* <ColorModeSwitcher /> */}
        </Flex>
    )

}