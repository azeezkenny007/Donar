import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [ethereum, setEthereum] = useState(undefined);
  const [connectedAccount, setConnectedAccount] = useState(undefined);
  
  const handleAccounts = (accounts:any) => {
  if (accounts.length > 0) {
    const account = accounts[0];
    console.log('We have an authorized account: ', account);
    setConnectedAccount(account);
  } else {
    console.log("No authorized accounts yet")
  }
};
  const connectAccount = async () => {
    console.log("This button was clicked")
  if (!ethereum) {
    alert('MetaMask is required to connect an account');
    return;
  }
  // @ts-ignore
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  handleAccounts(accounts);
  };
  // @ts-ignore
  useEffect(() => {
    const getConnectedAccount = async () => {
      if (window.ethereum) {
        setEthereum(window.ethereum);
      }
    
      if (ethereum) {
        // @ts-ignore
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        handleAccounts(accounts);
      }
    };
    getConnectedAccount()
  }, []);
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
