import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../config/Firebase';

const EditUserModal = props => {
  const {
    isOpen,
    onOpen,
    onClose,
    user,
    setStatus,
    data,
    setUser,
    setUpdate,
    input,
    setInput,
  } = props;
  console.log(input, 'ini input modal');

  const handleClose = () => {
    onClose();
    setUpdate(data);
  };
  useEffect(() => {});
  const editUser = async () => {
    await updateDoc(doc(db, 'user', user.uid), {
      name: input.name,
      role: input.role,
    });
    setStatus(true);
    setUpdate(data);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="First name"
              value={input.name}
              onChange={e => setInput({ ...input, name: e.target.value })}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Last name"
              value={user.email}
              onChange={e => setInput({ ...input, email: e.target.value })}
              isDisabled
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Action</FormLabel>
            <Input
              placeholder="Last name"
              value={input.role}
              onChange={e => setInput({ ...input, role: e.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => editUser()}>
            Save
          </Button>
          <Button onClick={() => handleClose()}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
