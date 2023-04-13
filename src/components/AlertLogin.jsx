import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AlertLogin(props) {
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { isOpen, onClose } = props;
  // console.log(isOpen, 'ini isopen')
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Alert
          </AlertDialogHeader>

          <AlertDialogBody>You should Login first</AlertDialogBody>
          <Flex justify="space-between" m={5}>
            <Button ref={cancelRef} onClick={onClose} colorScheme="red">
              Cancel
            </Button>

            <Button
              ref={cancelRef}
              onClick={() => navigate('/login')}
              colorScheme="green"
            >
              Login
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
