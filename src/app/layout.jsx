"use client"
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tabs from "@/components/Tabs";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from "@/store/store";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`work-sans-goog antialiased relative font-sans `}>
        <Provider store={store}>
          <ToastContainer />
          <Header />
          <Tabs />
          <div className="py-18 min-h-screen md:max-w-[1000px] w-full mx-auto">
            {children}
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}


