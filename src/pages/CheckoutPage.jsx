import { Box, Flex, FormControl, FormHelperText, FormLabel, Heading, HStack, Radio, RadioGroup, Text } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {useState} from 'react'
import { useCartState } from "../actions/Context";
import { useLocation } from "react-router-dom";
export default function CheckoutPage() {
    const location = useLocation()  
    const [bank, setBank] = useState('')
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    return (
        <>
            <Header />
            <Heading p={5} textTransform="uppercase" letterSpacing={5} >payment</Heading>
            <Box p={10}>
                <Text>Total: </Text><Heading fontSize={20}>$ {location.state.total.toFixed(2)}</Heading>
                <Flex justifyContent='center' alignItems='center' textTransform='uppercase'>
                    <Box>
                        <FormControl>
                            <FormLabel>Choose your payment</FormLabel>
                            <RadioGroup defaultValue='bca' onChange={(e)=>setBank(e)}>
                                <HStack>
                                    <Radio value='bca'>bca</Radio>
                                    <Radio value='bri'>bri</Radio>
                                    <Radio value='bni'>bni</Radio>
                                    <Radio value='mandiri'>mandiri</Radio>
                                </HStack>
                            </RadioGroup>
                            <FormHelperText>payment only with virtual account</FormHelperText>
                        </FormControl>
                    </Box>
                </Flex>
                <br/>
                <Text>Payment code:</Text>
                {bank === 'bca' ? <Heading>{makeid(10)}</Heading> : <></>}
                {bank === 'bri' ? <Heading>{makeid(15)}</Heading>  : <></>}
                {bank === 'bni' ? <Heading>{makeid(20)}</Heading> : <></>}
                {bank === 'mandiri' ? <Heading>{makeid(8)}</Heading> : <></>}
                
            </Box>
            <Footer />
        </>
    )
}