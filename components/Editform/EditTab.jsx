import React, { useState } from "react";

//Internal import
import Style from "./EditTab.module.css";

const EditTab = ({
  setopenEdit,
  setEditMsg,
  editMsg,
  editMesssage,
  userTaskId,
}) => {
  const [editFinalMsg, seteditFinalMsg] = useState(editMsg);

  console.log("userTaskId", userTaskId);

  return (
    <div className={Style.container}>
      <div className={Style.inputContainer}>
        <p>Task id: 1</p>
        <p onClick={() => setopenEdit(false)} className={Style.close}>
          x
        </p>
        <input
          type="text"
          placeholder="Edit message"
          value={editFinalMsg}
          onChange={(e) => seteditFinalMsg(e.target.value)}
        />
        <button
          onClick={() => (
            editMesssage(userTaskId, editFinalMsg), console.log("edited click")
          )}
        >
          {" "}
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTab;
