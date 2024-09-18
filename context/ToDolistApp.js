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
  const [myList, setMyList] = useState([]);

  const [allAddress, setAllAddress] = useState([]);
  const [currentUserMsg, setcurrentUserMsg] = useState([]);

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

  const getTodoList = async (currentAddr) => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      console.log("contract", contract);

      const currentUserMsgArray = await contract.getCreatorData(currentAddr);

      console.log("currentUserMsgArray", currentUserMsgArray);

      // currentUserMsgArray.wait();
      // console.log("currentUserMsgArray", currentUserMsgArray);

      // currentUserMsgArray.map((el, i) => {
      //   const singleUserInfo = el[0].message;
      //   console.log("singleUserInfo", singleUserInfo);
      //   setMyList(singleUserInfo);
      // });
      setMyList(currentUserMsgArray);
    } catch (error) {
      setError("Something wrong Getting Data");
    }
  };

  //CHANGE STATE OF TODOLIST FROM FALSE TO TRUE
  const toggle = async (currentUserAddr, todoId) => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const toggleStateTxHash = await contract.toggle(currentUserAddr, todoId);
      toggleStateTxHash.wait();

      console.log("statetime", toggleStateTxHash);
    } catch (error) {
      setError("Something wrong while changing toggle state/status");
    }
  };

  const deleteToggle = async (currentUserAddr, todoId) => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const deleteToggleStateTxHash = await contract.toggleDelete(
        currentUserAddr,
        todoId
      );
      deleteToggleStateTxHash.wait();

      console.log("statetime", deleteToggleStateTxHash);
    } catch (error) {
      setError("Something wrong while changing toggle state/status");
    }
  };

  const editMesssage = async (currentUserAddr, todoId, editmsg) => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = await fetchContract(signer);

      const editToggleStateTxHash = await contract.editTask(
        currentUserAddr,
        todoId,
        editmsg
      );
      editToggleStateTxHash.wait();

      console.log("statetime", editToggleStateTxHash);
    } catch (error) {
      setError("Something wrong while editing the message");
    }
  };

  function CONVERT_TIMESTAMP_TO_READABLE(timestamp) {
    const date = new Date(timestamp * 1000);

    const readableTime = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return readableTime;
  }

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        getTodoList,
        toDoList,
        currentAccount,
        error,
        myList,
        CONVERT_TIMESTAMP_TO_READABLE,
        toggle,
        deleteToggle,
        editMesssage,
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};

// const ToDolistApp = () => {
//   return <div>ToDolistApp</div>;
// };

// export default ToDolistApp;
