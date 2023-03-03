import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Signup(){
    return(
    <Box>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type='text'/>
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type='password'/>
        </FormControl>
        <FormControl>
            <Button>Signup</Button>
        </FormControl>
    </Box>
    )
}