import React, { useState } from "react";

//Internal import

import Style from "./Addform.module.css";
const AddFrom = ({ openAddform, setopenAddform, toDoList }) => {
  const [message, setMessage] = useState("");

  return (
    <div className={Style.container}>
      <div className={Style.inputContainer}>
        <p onClick={() => setopenAddform(false)} className={Style.close}>
          x
        </p>
        <input
          type="text"
          placeholder="Add task"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={() => toDoList(message)}>Submit onChain</button>
      </div>
    </div>
  );
};

export default AddFrom;
