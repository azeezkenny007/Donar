import React from "react";
import Navbar from "./Navbar/Navbar";
import { Container, Box } from "@chakra-ui/react";
import Footer from "./Footer/Footer";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Navbar />
      {children}
      <Footer />
    </Box>
  );
};

export default Layout;
