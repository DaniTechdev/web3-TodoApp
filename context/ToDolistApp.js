import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//INTERNAL IMPORT
import { todoListAddress, todoListABI } from "./constants";

//interact with our smart contract

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(todoListAddress, todoListABI, signerOrProvider);

export const ToDoListContext = React.createContext();

export const ToDoListProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allTodoList, setAllTodoList] = useState([]);
  const [myList, setMyList] = useState([]);

  const [allAddress, setAllAddress] = useState([]);

  //CONNECTING METAMASK

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("please install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
      console.log("first account", account[0]);
    } else {
      setError("Please Install MetaMask & connect, reload");
    }
  };

  //   useEffect(() => {
  //     checkIfWalletIsConnected();
  //   }, []);

  return (
    <ToDoListContext.Provider value={{ checkIfWalletIsConnected }}>
      {children}
    </ToDoListContext.Provider>
  );
};

// const ToDolistApp = () => {
//   return <div>ToDolistApp</div>;
// };

// export default ToDolistApp;
