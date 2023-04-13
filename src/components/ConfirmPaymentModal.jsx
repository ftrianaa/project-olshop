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
import { Checkout } from '../actions/Actions';
import { useCartDispatch } from '../actions/Context';
import Swal from 'sweetalert2';
export default function ConfirmPaymentModal(props) {
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { isOpen, onClose } = props;
  const dispatch = useCartDispatch();
  const handleCheckout = () => {
    Checkout(dispatch);
    Swal.fire({
      icon: 'success',
      title: 'Payment Success',
      text: 'Thank you for trusting us! Hope you enjoy the service~',
    });
    navigate('/');
  };
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

          <AlertDialogBody>
            Are you sure you already complete the payment?
          </AlertDialogBody>
          <Flex justify="space-between" m={5}>
            <Button
              ref={cancelRef}
              onClick={onClose}
              colorScheme="red"
              size="sm"
            >
              Cancel
            </Button>

            <Button
              onClick={() => handleCheckout()}
              colorScheme="green"
              size="sm"
            >
              Confirm
            </Button>
          </Flex>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
