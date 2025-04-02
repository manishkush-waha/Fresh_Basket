"use client"
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { Provider} from 'react-redux';
import store from "@/store/store";
import MainPage from "./_main";


export default function RootLayout({ children }) {
  
    return (
      <html lang="en">
        <body className={`work-sans-goog antialiased relative font-sans `}>
          <Provider store={store}>
            <ToastContainer />
            <MainPage children={children}/>
          </Provider>
        </body>
      </html>
    );
}


