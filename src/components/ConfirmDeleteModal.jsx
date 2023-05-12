import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../config/Firebase';
export default function ConfirmDeleteModal(props) {
  const { isOpen, onOpen, onClose, user, setStatus, setUpdate, data } = props;
  const deleteUser = async () => {
    await deleteDoc(doc(db, 'user', user.uid));
    setStatus(true);
    setUpdate(data);
  };
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure want to delete user '{user.name}'?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                deleteUser();
                onClose();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
