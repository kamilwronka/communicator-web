import { Suspense } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { GatewayProvider } from 'contexts/GatewayContext';
import { BrowserRouter } from 'react-router-dom';

import { FullScreenLoading } from 'components';

import 'i18n/init';

import theme from 'layout/theme';

import { Navigation } from 'navigation';

import Auth0 from 'providers/Auth0';

import Loading from 'screens/loading';

function App() {
  return (
    <Suspense fallback={<FullScreenLoading />}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Auth0>
            <Loading />
            <GatewayProvider>
              <Navigation />
            </GatewayProvider>
          </Auth0>
        </BrowserRouter>
      </ChakraProvider>
    </Suspense>
  );
}

export default App;
