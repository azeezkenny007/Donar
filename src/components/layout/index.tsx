import React from "react";
import Navbar from "./Navbar/Navbar";
import { Container, Box } from "@chakra-ui/react";
import Footer from "./Footer/Footer";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box className="pb-20">
      <Navbar />
      {children}
      <Footer />
      <div className="bg-dark-line w-full h-0.5 mt-20 mb-32" />
    </Box>
  );
};

export default Layout;
