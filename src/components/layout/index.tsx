import React from "react";
import Navbar from "./Navbar/Navbar";
import { Container, Box } from "@chakra-ui/react";
import Footer from "./Footer/Footer";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Box className="pb-10">
      <Navbar />
      {children}
      <Footer />
      <div className="bg-dark-line w-full h-0.5 mt-12 mb-12" />
      <p className="text-center text-light-text text-text">
        ©copyright 2022 - Polygon Africa Hackathon
      </p>
    </Box>
  );
};

export default Layout;
