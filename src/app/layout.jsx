"use client"
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from "@/store/store";
import MainPage from "./_main";
// import { ChakraProvider } from '@chakra-ui/react'

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`work-sans-goog antialiased relative font-sans `}>
        {/* <ChakraProvider > */}
          <Provider store={store}>
            <ToastContainer />
            <MainPage children={children} />
          </Provider>
        {/* </ChakraProvider> */}
      </body>
    </html>
  );
}


