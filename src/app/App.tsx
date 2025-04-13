import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router/dom';

import { AppRouter } from '../routes/router';
import { theme } from '../theme';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={AppRouter} />
        </ChakraProvider>
    );
}

export default App;
