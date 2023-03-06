import { Box, Button, Flex, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tag, useDisclosure } from "@chakra-ui/react"

export default function DescriptionModal(props) {
    const { isOpen, onClose, item } = props
    // console.log(item, 'ini item modal')
    return (
        <>
            {/* <Button onClick={onOpen}>Trigger modal</Button> */}

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                {/* {item.map((product, index) => ( */}
                    <ModalContent>
                        <ModalHeader textTransform='uppercase' letterSpacing={2}>Description</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Flex justify='center' align='center'>
                                <Image src={item.image} w={300} h={300} overflow='hidden' objectFit='contain'/>
                            </Flex>
                            <br/>
                            <Heading fontSize={25} >{item.title}</Heading>
                            <Tag mt={5} mb={5}>{item.category}</Tag>
                            <br/>
                          {item.description}
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                {/* ))} */}
            </Modal>
        </>
    )
}