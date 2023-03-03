import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';

import Routers from './routers/Routers';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
      <Routers/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
