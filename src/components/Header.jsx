import { Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { LogoutUser } from "../actions/Actions";
import { useAuthDispatch } from "../actions/Context";
import { ColorModeSwitcher } from '../ColorModeSwitcher'
export default function Header() {
    const dispatch = useAuthDispatch()
    const handleLogout=()=>{
        LogoutUser(dispatch)
    }
    return (
        <Flex bgColor='gray.700'>
            <Heading>olimall</Heading>
            <Spacer />
            <Button>Home</Button>
            <Button>Cart</Button>
            <Button onClick={() => handleLogout()}>LogOut</Button>
            <ColorModeSwitcher/>
        </Flex>
    )

}