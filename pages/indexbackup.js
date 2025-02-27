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
  //STATE
  const [message, setMessage] = useState("");
  const [myListData, setMyListData] = useState([]);
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
  } = useContext(ToDoListContext);

  // useEffect(() => {
  //   checkIfWalletIsConnected();
  //   // getActiveTodo();
  // }, [currentAccount]);

  useEffect(() => {
    checkIfWalletIsConnected();
    const activeTodoData = getActiveTodo();

    console.log("Get all getCampaignsData", activeTodoData);

    return async () => {
      const allActiveData = await activeTodoData;
      setMyListData(allActiveData);
    };
  }, [deleteToggle]);

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
          <div>
            {myListData?.map((el, index) => (
              <div className={Style.home_completed_list} key={index}>
                <MdVerified className={Style.iconColor} />
                <p>{el.message}...</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <p>Create BlockChain TodoList</p>
            <div className={Style.home_create_input}>
              <input
                type="Text"
                placeholder="Enter Your todo"
                onChange={(e) => setMessage(e.target.value)}
              />

              {currentAccount ? (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => toDoList(message)}
                />
              ) : (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onClick={() => connectWallet()}
                />
              )}
            </div>

            <Data
              myList={myListData}
              CONVERT_TIMESTAMP_TO_READABLE={CONVERT_TIMESTAMP_TO_READABLE}
              currentAccount={currentAccount}
              deleteToggle={deleteToggle}
              editMesssage={editMesssage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
