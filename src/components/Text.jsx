import { Flex, Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Headers = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
    >
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          onClick={isOpen ? onClose : onOpen}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="outline"
          aria-label="Menu"
        />
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <Box>Logo</Box>
      </Box>
      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Box>Link 1</Box>
        <Box>Link 2</Box>
        <Box>Link 3</Box>
      </Box>
    </Flex>
  );
};

export default Headers;