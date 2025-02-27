import React, { useState } from "react";

//Internal import
import Style from "./Card.module.css";
import EditTab from "../Editform/EditTab";
import Deletebox from "../DeleteBox/Deletebox";

const Card = ({
  openEdit,
  setopenEdit,
  openDeleBox,
  setopenDeleBox,
  myListData,
  CONVERT_TIMESTAMP_TO_READABLE,
  deleteToggle,
  editMesssage,
  toggleDone,
}) => {
  const [userTaskId, setuserTaskId] = useState("");
  const [editMsg, setEditMsg] = useState("");

  return myListData?.map((todo, index) => {
    const { readableDate, readableTime } = CONVERT_TIMESTAMP_TO_READABLE(
      todo.creationTimeStamp
    );

    console.log("todo.userId", todo.userId.toNumber());
    const id = todo.userId.toNumber();

    const todoID = todo.userId.toNumber();

    console.log("complted: ", todo.completed);

    return (
      <div className={Style.container}>
        <div className={Style.containerCard}>
          <div className={Style.cardLeft}>
            <p
              className={
                todo.completed ? Style.todoCompleted : Style.notCompleted
              }
            >
              {todo.message}
            </p>
            <input
              type="checkbox"
              className={Style.checkBox}
              checked={todo.completed ? true : false}
              onClick={() => toggleDone(todoID)}
            />
          </div>
          <div className={Style.cardRight}>
            <div className={Style.status}>
              <p>Status:</p>{" "}
              <span className={Style.spanStatus}>
                {" "}
                {todo.completed ? "Done" : "Active"}
              </span>
            </div>
            <div className={Style.creationDate}>
              <p>Create Date:</p>{" "}
              <span className={Style.spanData}> {readableDate}</span>
            </div>
            <div className={Style.creationTime}>
              <p>Create time:</p>{" "}
              <span className={Style.spanTime}> {readableTime}</span>
            </div>
            <button
              className={Style.editButton}
              onClick={() => (setopenEdit(true), setEditMsg(todo.message))}
            >
              Edit
            </button>
            <button
              className={Style.delButton}
              onClick={() => setopenDeleBox(true)}
            >
              Delete
            </button>
          </div>
        </div>

        {openEdit ? (
          <EditTab
            setopenEdit={setopenEdit}
            setEditMsg={setEditMsg}
            editMsg={editMsg}
            editMesssage={editMesssage}
            userTaskId={id}
          />
        ) : null}
        {openDeleBox ? (
          <Deletebox
            setopenDeleBox={setopenDeleBox}
            setuserTaskId={setuserTaskId}
            userTaskId={todoID}
            deleteToggle={deleteToggle}
          />
        ) : null}
      </div>
    );
  });
};

export default Card;
