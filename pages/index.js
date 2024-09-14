import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { ToDoListContext } from "../context/ToDolistApp";
const Home = () => {
  const { checkIfWalletIsConnected, toDoList } = useContext(ToDoListContext);

  useEffect(() => {
    checkIfWalletIsConnected();
    toDoList();
  }, []);
  return <div>Home</div>;
};

export default Home;
