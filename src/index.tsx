import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import '@fontsource/raleway/200.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/montserrat/700.css'
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let theme = extendTheme({
  fonts: {
    heading: 'Montserrat',
    body: 'Raleway, sans-serif',
  },
  config : {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
})


root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App/>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
