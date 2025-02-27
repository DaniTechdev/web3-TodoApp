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
  const [currentAccount, setCurrentAccount] = useState(null);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState("");

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

  const disconnectWallet = async () => {
    setCurrentAccount(null);
  };

  //INTERACTING WITH OUR SMART CONTRACT

  const toDoList = async (message) => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      //   console.log("contract", contract);
      const createList = await contract.createList(message);
      createList.wait();

      console.log("createList", createList);
      window.location.reload();
    } catch (error) {
      setError("Something wrong creating list");
    }
  };

  const getActiveTodo = async () => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("contract", contract);

      const currentUserMsgArray = await contract.getActiveTodos();

      return currentUserMsgArray;
    } catch (error) {
      setError("Something wrong Getting Data");
    }
  };

  //CHANGE STATE OF TODOLIST FROM FALSE TO TRUE

  const deleteToggle = async (todoId) => {
    console.log("todoId for deleting", todoId * 1);

    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const deleteToggleStateTxHash = await contract.toggleDelete(todoId * 1);
      deleteToggleStateTxHash.wait();

      // console.log("statetime", deleteToggleStateTxHash);

      getActiveTodo();
      window.location.reload();
    } catch (error) {
      setError("Something wrong while changing toggle state/status");
    }
  };
  const editMesssage = async (todoId, editmsg) => {
    try {
      console.log("Editing message...", { todoId, editmsg }); // Log input values

      // Initialize Web3Modal
      const web3modal = new Web3Modal();
      console.log("Web3Modal initialized");

      // Connect to the wallet
      const connection = await web3modal.connect();
      console.log("Wallet connected");

      // Initialize the provider
      const provider = new ethers.providers.Web3Provider(connection);
      console.log("Provider initialized");

      // Get the signer
      const signer = provider.getSigner();
      console.log("Signer fetched");

      // Fetch the contract
      const contract = fetchContract(signer);
      console.log("Contract fetched");

      // Call the editTask function on the smart contract
      console.log("Calling editTask on the contract...");
      const editToggleStateTxHash = await contract.editTask(
        todoId * 1,
        editmsg
      );
      console.log("Transaction hash:", editToggleStateTxHash);

      // Wait for the transaction to be confirmed
      console.log("Waiting for transaction confirmation...");
      await editToggleStateTxHash.wait();
      console.log("Transaction confirmed");

      // Reload the page to reflect changes
      console.log("Reloading page...");
      window.location.reload();
    } catch (error) {
      console.error("Error editing message:", error);
      setError("Something wrong while editing the message");
    }
  };

  function CONVERT_TIMESTAMP_TO_READABLE(timestamp) {
    // Check if the timestamp is valid
    if (!timestamp || isNaN(timestamp)) {
      return "Invalid Date";
    }

    // Convert the timestamp to a Date object
    const date = new Date(Number(timestamp) * 1000); // Multiply by 1000 if timestamp is in seconds

    // Define month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get date components
    const month = monthNames[date.getMonth()]; // Get month name
    const day = date.getDate(); // Get day of the month
    const year = date.getFullYear(); // Get full year
    let hours = date.getHours(); // Get hours
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes (padded with 0)
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Construct the readable date and time strings
    const readableDate = `${month} ${day}, ${year}`;
    const readableTime = `${hours}:${minutes} ${ampm}`;

    return { readableDate, readableTime };
  }

  const getDeletedTodos = async () => {
    try {
      //Connecting with smart contract

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("contract", contract);

      const currentUserMsgArray = await contract.getAllDeletedTodos();

      return currentUserMsgArray;
    } catch (error) {
      setError("Something wrong Getting Data");
    }
  };

  const getUserBalance = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const balance = await provider.getBalance(currentAccount); // Get balance in wei
      const balanceInEther = ethers.utils.formatEther(balance); // Convert wei to Ether
      setBalance(balanceInEther);
    } catch (error) {}
  };

  const toggleDone = async (taskID) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      console.log("contract", contract);

      const currentUserMsgArray = await contract.toggleDone(taskID);

      currentUserMsgArray.wait();

      window.location.reload();
    } catch (error) {}
  };

  return (
    <ToDoListContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWallet,
        currentAccount,
        toDoList,
        error,
        getActiveTodo,
        CONVERT_TIMESTAMP_TO_READABLE,
        deleteToggle,
        editMesssage,
        getDeletedTodos,
        disconnectWallet,
        getUserBalance,
        balance,
        toggleDone,
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
