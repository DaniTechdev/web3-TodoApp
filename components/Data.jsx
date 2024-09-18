import React, { useContext, useEffect, useState } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { FaCheckSquare } from "react-icons/fa";
{
  /* <FaCheckSquare /> */
}

//INTERNAL IMPORT
// import { ToDoListContext } from "../context/ToDolistApp";
import Style from "../styles/index.module.css";

const Data = ({
  allTodoList,
  allAddress,
  myList,
  change,
  CONVERT_TIMESTAMP_TO_READABLE,
  toggle,
  deleteToggle,
  currentAccount,
  editMesssage,
}) => {
  // const { change } = useContext(ToDoListContext);
  const [edit, setEdit] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  console.log("editMessage", editMessage);

  return (
    <div className={Style.home_create_list}>
      {myList.length === 0 ? (
        <div className={Style.noData}>No Data</div>
      ) : (
        <div>
          {myList
            .filter((list) => list.deleted === false)
            .map((el, index) => {
              //       address account;
              // uint256 userId;
              // string message;
              // bool completed;
              // uint256 creationTimeStamp;
              // uint256 completionTimeStamp;
              // bool deleted;
              // uint256 deletionTimeStamp;
              // string editMessage;
              // bool edited;
              // uint256 editDate;

              const timeStampCreated = el.creationTimeStamp;
              const timeStampCompleted = el.completionTimeStamp;
              const timeStampDelete = el.deletionTimeStamp;

              const timeFormaterCreated =
                CONVERT_TIMESTAMP_TO_READABLE(timeStampCreated);
              const timeFormaterCompleted =
                CONVERT_TIMESTAMP_TO_READABLE(timeStampCompleted);
              const timeFormaterDelete =
                CONVERT_TIMESTAMP_TO_READABLE(timeStampDelete);

              // console.log("timeFormater", timeFormater);

              return (
                <div key={index + 1} className={Style.home_create_list_app}>
                  <div className={Style.lock_list}>
                    <AiFillLock className={Style.lock_color} />
                    {el.message}
                  </div>
                  {el.completed === false ? (
                    <div className={Style.done}>
                      <p> Status:&nbsp; Not yet completed</p>
                      <p>Task creation date: {timeFormaterCreated}</p>
                      <FaCheckSquare
                        onClick={() => toggle(currentAccount, index)}
                        className={Style.iconClose}
                      />

                      <p>
                        Delete:
                        <RiCloseFill
                          onClick={() => deleteToggle(currentAccount, index)}
                        />{" "}
                      </p>
                      <button onClick={() => setEdit(index)}>Edit Task</button>

                      {/* Add edit input and button */}
                      {edit === index && (
                        <div>
                          <input
                            type="text"
                            value={el.message}
                            placeholder={`${el.message}`}
                            onChange={(e) => {
                              setEditMessage(e.target.value);
                            }}
                            className={Style.editInput}
                          />
                          <button
                            className={Style.editButton}
                            onClick={() =>
                              editMesssage(currentAccount, index, editMessage)
                            }
                          >
                            Done Editing
                          </button>
                          <button
                            className={Style.editButton}
                            onClick={() => setEdit(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={Style.done}>
                      <p> Status: &nbsp; Done</p>
                      <p>Task creation date: {timeFormaterCreated}</p>
                      <p>Task completion date: {timeFormaterCompleted}</p>
                      <RiCloseFill
                        onClick={() => deleteToggle(currentAccount, index)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Data;
