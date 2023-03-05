import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme'

import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Auth0Provider
        domain="dev-6y0bdyh2adue8v00.us.auth0.com"
        clientId="qWaiboyAjpn1kCSTZEzixfh5tDCDHKeX"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </ChakraProvider>
);

