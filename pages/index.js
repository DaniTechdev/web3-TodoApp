import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import Image from "next/image";

//INTERNAL IMPORT
import { ToDoListContext } from "../context/ToDolistApp";
import Style from "../styles/index.module.css";
import Data from "../components/Data";

//HOME COMPONENT

const Home = () => {
  const {
    checkIfWalletIsConnected,
    connectWallet,
    getTodoList,
    toDoList,
    currentAccount,
    error,
    allTodoList,
    myList,
    allAddress,
  } = useContext(ToDoListContext);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={"/Loading.png"} alt="Logo" width={50} height={50} />
        <div className={Style.connect}>
          {!currentAccount ? (
            <button onClick={() => connectWallet()}>Connect Wallet</button>
          ) : (
            <button>{currentAccount.slice(0, 20)}...</button>
          )}
        </div>
      </div>

      <div className={Style.home_box}>
        <div className={Style.home_completed}>
          <h2>ToDo History List</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
