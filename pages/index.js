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
    change,
  } = useContext(ToDoListContext);

  useEffect(() => {
    checkIfWalletIsConnected();
    getTodoList();
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
          <div>
            {myList.map((el, i) => (
              <div className={Style.home_completed_list}>
                <MdVerified className={Style.iconColor} />
                <p>{el.slice(0, 30)}...</p>
              </div>
            ))}
          </div>
        </div>

        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create BlockChain TodoList</h2>
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
              allTodoList={allTodoList}
              allAddress={allAddress}
              myList={myList}
              change={change}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
