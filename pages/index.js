import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";

import Image from "next/image";

//INTERNAL IMPORT
import { ToDoListContext } from "../context/ToDolistApp";
import Navbar from "../components/Navbar/Navbar";
import Style from "../styles/index.module.css";
import Data from "../components/Data";
import Banner from "../components/Banner/Banner";
import Card from "../components/Card/Card";
import Deletebox from "../components/DeleteBox/Deletebox";

//HOME COMPONENT

const Home = () => {
  //STATE
  const [message, setMessage] = useState("");
  const [myListData, setMyListData] = useState([]);

  const [openAddform, setopenAddform] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [openDeleBox, setopenDeleBox] = useState(false);

  const {
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
  } = useContext(ToDoListContext);

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  //   // getActiveTodo();
  //   getUserBalance();
  // }, [currentAccount]);
  useEffect(() => {
    checkIfWalletIsConnected();
    const activeTodoData = getActiveTodo();
    getUserBalance();

    console.log("Get all getCampaignsData", activeTodoData);

    return async () => {
      const allActiveData = await activeTodoData;
      setMyListData(allActiveData);
    };
  }, [editMesssage, deleteToggle, toDoList]);

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  //   getUserBalance();
  //   const activeTodoData = getActiveTodo();

  //   console.log("Get all getCampaignsData", activeTodoData);

  //   return async () => {
  //     const allActiveData = await activeTodoData;
  //     setMyListData(allActiveData);
  //   };
  // }, []);

  return (
    <div>
      <Navbar
        currentAccount={currentAccount}
        balance={balance}
        connectWallet={connectWallet}
      />
      <Banner
        setopenAddform={setopenAddform}
        openAddform={openAddform}
        toDoList={toDoList}
      />
      <Card
        setopenEdit={setopenEdit}
        openEdit={openEdit}
        openDeleBox={openDeleBox}
        setopenDeleBox={setopenDeleBox}
        myListData={myListData}
        CONVERT_TIMESTAMP_TO_READABLE={CONVERT_TIMESTAMP_TO_READABLE}
        deleteToggle={deleteToggle}
        editMesssage={editMesssage}
        toggleDone={toggleDone}
      />
    </div>
  );
};

export default Home;
