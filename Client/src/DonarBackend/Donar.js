import { createContext } from "react";
import { ethers } from "ethers";

const DonarContext = createContext(null);

const DonarProvider = ({ children }) => {
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("connected !!!!");
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("metamask does not exist");
    }
  }

  return (
    <DonarContext.Provider value={{ connect }}>
      {children}
    </DonarContext.Provider>
  );
};

export { DonarProvider, DonarContext };
