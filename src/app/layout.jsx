
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tabs from "@/components/Tabs";


export const metadata = {
  title: "Grocery Web App",
  description: "This is a grocety app for daily needs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`work-sans-goog antialiased relative font-sans `}>
        <Header />
        <Tabs />
        <div className="py-18 md:max-w-[1000px] w-full mx-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}


