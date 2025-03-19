import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Layout = ({ children, title, desc, keywords, author, classname }) => {
  window.scrollBy(0, 0);
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc}></meta>
        <meta name="author" content={author}></meta>
        <meta name="keywords" content={keywords}></meta>
      </Helmet>
      <header>
        <Navbar />
      </header>
      <main className={"min-h-screen bg-[#fdf6f0] " + classname}>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
