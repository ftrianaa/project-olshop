import { Box, Button, Divider, Flex, FormControl, FormHelperText, Grid, GridItem, Heading, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";

import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedin, FaPhone, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi'
export default function Footer() {
    return (
        <>
            <Divider />

            <Flex alignItems='center' justifyContent='center' p={5} >
                <Flex pr={10}> <FaPhone /> <Text>080808</Text>  </Flex>
                <Flex pr={10}> <FaInstagram /> <Text>olimall</Text></Flex>
                <Flex pr={10}> <FaEnvelope /><Text> olimall@index.co</Text> </Flex>
            </Flex>
            <Box bgColor='gray.700' textTransform='capitalize'  fontSize='15px'>
                <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                    <GridItem  >
                        <Heading textTransform='uppercase'  fontSize='30px' p={5}>help</Heading>
                        <Box textAlign='left'>
                            <Text padding='5px 50px'>customer service</Text>
                            <Text padding='5px 50px'>track order</Text>
                            <Text padding='5px 50px'>return & exchanage</Text>
                            <Text padding='5px 50px'>shipping</Text>
                            <Text padding='5px 50px'>international orders</Text>
                            <Text padding='5px 50px'>contact us</Text>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Heading textTransform='uppercase' fontSize='30px' p={5}>quick links</Heading>
                        <Box textAlign='left'>
                            <Text padding='5px 0'>find a shoe</Text>
                            <Text padding='5px 0px'>size chart</Text>
                            <Text padding='5px 0px'>refer a friend</Text>
                            <Text padding='5px 0px'>offer & promotion</Text>
                            <Text padding='5px 0px'>my favorites</Text>
                        </Box>
                    </GridItem>
                    <GridItem>
                        <Heading textTransform='uppercase' fontSize='30px' p={5}>about</Heading>
                        <Box textAlign='left'>
                            <Text padding='5px 0px'>our story</Text>
                            <Text padding='5px 0px'>careers</Text>
                            <Text padding='5px 0px'>social responsibility</Text>
                            <Text padding='5px 0px'>California Transparency Act/Modern Slavery Act</Text>
                            <Text padding='5px 0px'>Investor Relations</Text>
                            <Text padding='5px 0px'>Terms of Use</Text>
                            <Text padding='5px 0px'>Privacy policy</Text>
                            <Text padding='5px 0px'>California Do Not Sell My Personal Information</Text>
                            <Text padding='5px 0px'>Diversity, Equity and Inclusion at J.Crew Group</Text>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Heading textTransform='uppercase' fontSize='30px' p={5}>like being first?</Heading>
                        <FormControl>
                            <FormHelperText>Get can't-miss style news, before everybody else.</FormHelperText>
                            <InputGroup w='550px'>
                                <Input />
                                <InputRightElement w='90px' >
                                    <Button >
                                        Sign up
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                </Grid>
            </Box>
            <Box bgColor='gray.700' fontSize='30px' p={10} textAlign='left'>
                <Flex>
                    <Text pr={5}><FaInstagram /> </Text>
                    <Text pr={5}><FaFacebookF /> </Text>
                    <Text pr={5}><FaTwitter /> </Text>
                    <Text pr={5}><FaLinkedin /> </Text>
                    <Text pr={5}><FaPinterest /> </Text>
                    <Text pr={5}> <FaYoutube /> </Text>
                </Flex>
                <Text fontSize='20px'>Indonesia</Text>
                <Heading>sponsorship</Heading>
                <Text  fontSize='20px' color='beige'>&copy;2023 Fitriana</Text>
            </Box>
        </>
    )
}