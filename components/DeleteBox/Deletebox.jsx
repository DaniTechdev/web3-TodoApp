import React from "react";

//Internal import
import Style from "./Delete.module.css";

const Deletebox = ({
  setopenDeleBox,
  setuserTaskId,
  userTaskId,
  deleteToggle,
}) => {
  return (
    <div className={Style.container}>
      <div className={Style.containerBox}>
        <h1>Are you sure you want to delete this task?</h1>
        <button className={Style.yes} onClick={() => deleteToggle(userTaskId)}>
          Yes
        </button>
        <button onClick={() => setopenDeleBox(false)} className={Style.no}>
          No
        </button>
      </div>
    </div>
  );
};

export default Deletebox;
