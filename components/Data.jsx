import React, { useContext, useEffect } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";

//INTERNAL IMPORT
// import { ToDoListContext } from "../context/ToDolistApp";
import Style from "../styles/index.module.css";

const Data = ({ allTodoList, allAddress, myList, change }) => {
  // const { change } = useContext(ToDoListContext);

  console.log(allTodoList);

  function CONVERT_TIMESTAMP_TO_READABLE(timestamp) {
    const date = new Date(timestamp * 1000);

    const readableTime = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return readableTime;
  }

  return (
    <div className={Style.home_create_list}>
      {allTodoList.length === 0 ? (
        <div className={Style.noData}>No Data</div>
      ) : (
        <div>
          {allTodoList.map((el, i) => {
            const timeStampCreated = el[4];
            const timeStampCompleted = el[5];

            console.log(
              "timeStampCreated",
              timeStampCreated,
              "timeStampCompleted",
              timeStampCompleted
            );

            const timeFormaterCreated =
              CONVERT_TIMESTAMP_TO_READABLE(timeStampCreated);
            const timeFormaterCompleted =
              CONVERT_TIMESTAMP_TO_READABLE(timeStampCompleted);

            // console.log("timeFormater", timeFormater);

            return (
              <div key={i + 1} className={Style.home_create_list_app}>
                <div className={Style.lock_list}>
                  <AiFillLock className={Style.lock_color} />
                  {el[2]}
                </div>
                {el[3] === false ? (
                  <div>
                    <p>Task creation date: {timeFormaterCreated}</p>
                    <p>Not yet completed</p>
                    <RiCloseFill
                      onClick={() => change(el[0])}
                      className={Style.iconClose}
                    />
                  </div>
                ) : (
                  <div>
                    <p className={Style.down}>Done</p>
                    <p>Task creation date: {timeFormaterCreated}</p>
                    <p>Task completion date: {timeFormaterCompleted}</p>
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
