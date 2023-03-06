import { Box, Button, FormControl, FormLabel, Heading, Input, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    return (
        <Flex justify='center'>
        <Box p={20} w='100vh'>
            <Heading fontSize='20px' fontWeight='200'>Get Started With</Heading>
            <Heading textTransform='uppercase' letterSpacing={10} pb={10}>Olimall</Heading>
            <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input type='text' />
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='text' />
            </FormControl>
            <FormControl>
                <FormLabel>Birthdate</FormLabel>
                <Input type='date' />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input type='password' />
            </FormControl>
            <FormControl pt={5}>
                <Button>Signup</Button>
            </FormControl>
            <Text p={5} textTransform="uppercase" fontSize='16px' letterSpacing={2}>have an account?<Text fontWeight='bold' cursor='pointer' onClick={() => navigate('/')}>login here</Text></Text>
        </Box>
        </Flex>
    )
}