import React from "react";
import Footer from "../components/navigation/Footer";
import NavBar from "../components/navigation/Navbar";

const Layout = (props) => {
  return (
    <div>
      <NavBar />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
