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

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      console.log("first account", accounts[0]);
    } else {
      setError("Please Install MetaMask & connect, reload");
    }
  };

  //--CONNECT WALLET
  //we will change the method
  const connectWallet = async () => {
    if (!window.ethereum) return setError("please install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
  };

  //INTERACTING WITH OUR SMART CONTRACT

  const toDoList = async (message) => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      //   console.log("contract", contract);
      const createList = await contract.createList(message);
      createList.wait();

      console.log("createList", createList);
    } catch (error) {
      setError("Something wrong creating list");
    }
  };

  const getTodoList = async();

  return (
    <ToDoListContext.Provider
      value={{ checkIfWalletIsConnected, connectWallet, toDoList }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};

// const ToDolistApp = () => {
//   return <div>ToDolistApp</div>;
// };

// export default ToDolistApp;
