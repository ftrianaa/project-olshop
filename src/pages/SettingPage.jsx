import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { useState } from 'react';
import { db } from '../config/Firebase';
import EditUserModal from '../components/EditUserModal';
const SettingPage = () => {
  const [edit, setEdit] = useState(true);

  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    uid: '',
    name: '',
  });
  const [action, setAction] = useState('');
  const [update, setUpdate] = useState('');
  const [status, setStatus] = useState(false);
  // console.log(edit);
  const getAllData = async () => {
    const querySnapshot = await getDocs(collection(db, 'user'));
    let dataUser = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      console.log(doc.data(), 'ini datas');
      dataUser.push(doc.data());
      setData(dataUser);
    });
  };
  const [input, setInput] = useState({});
  const handleEdit = user => {
    onOpen();
    setUser({
      uid: user.uid,
      name: user.name,
      role: user.role,
      email: user.email,
    });
    setInput({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setAction('edit');
  };
  const handleDelete = user => {
    onOpen();
    setUser({ uid: user.uid, name: user.name });
    setAction('delete');
  };

  // const getData = async () => {
  //   const q = query(collection(db, 'user'), where('email', '==', email));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach(doc => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // };

  // console.log(update, 'ini data');
  // console.log(status, 'ini status');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getAllData();
  }, [update, user]);
  console.log(user, 'ini user');

  return (
    <>
      <Header />
      <Heading
        p={5}
        textTransform="uppercase"
        letterSpacing={5}
        fontSize="28px"
      >
        Setting
      </Heading>
      <Container my="5">
        {/* <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            isDisabled={edit}
            onChange={e => setInput(e.target.value)}
            value={input}
          />
        </FormControl>
        {edit ? (
          <Button
            onClick={() => {
               setEdit(false);
              getAllData();
            }}
            my="5"
          >
            Edit
          </Button>
        ) : (
          <Button onClick={() => setEdit(true)} my="5">
            Save
          </Button>
        )} */}
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((user, index) => (
                <Tr key={index} fontSize="15px">
                  <Td>{index + 1}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleEdit(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(user);
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
      {action === 'delete' ? (
        <ConfirmDeleteModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          user={user}
          setStatus={setStatus}
          setUpdate={setUpdate}
          data={data}
          setUser={setUser}
        />
      ) : action === 'edit' ? (
        <EditUserModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          user={user}
          setStatus={setStatus}
          setUpdate={setUpdate}
          data={data}
          setUser={setUser}
          setInput={setInput}
          input={input}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default SettingPage;
