import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router/dom';

import { theme } from '../theme';
import { AppRouter } from './routes/router';

function App() {
    return (
        <ChakraProvider theme={theme}>
            <RouterProvider router={AppRouter} />
        </ChakraProvider>
    );
}

export default App;
