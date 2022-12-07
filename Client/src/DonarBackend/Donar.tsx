import { createContext, useContext, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

type IDonar = {
  Metaconnect: () => void;
  connected: any;
};

const DonarContext = createContext<IDonar>({
  Metaconnect() {
    return;
  },
  connected: null,
});

const DonarProvider = ({ children }: React.PropsWithChildren) => {
  const [connected, setConnected] = useState(null);
  async function Metaconnect() {
    const provider = await detectEthereumProvider();

    if (provider) {
      console.log(provider);
      startApp(provider);
    } else {
      console.log("Please install MetaMask!");
    }
    function startApp(provider: any) {
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }
    }
    window.ethereum
      .request({ method: "eth_accounts" })
      .then(handleAccountsChanged)
      .catch((err: any) => {
        console.error(err);
      });
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    function handleAccountsChanged(accounts: any) {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== connected) {
        setConnected(accounts[0]);
      }
    }
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(handleAccountsChanged)
      .catch((err: any) => {
        if (err.code === 4001) {
          console.log("Please accept.");
        } else {
          console.error(err);
        }
      });
  }

  return (
    <DonarContext.Provider value={{ Metaconnect, connected }}>
      {children}
    </DonarContext.Provider>
  );
};

const useDonar = () => {
  return useContext(DonarContext);
};

export { DonarProvider, useDonar };
