import React, { useContext } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";

//INTERNAL IMPORT
// import { ToDoListContext } from "../context/ToDolistApp";
import Style from "../styles/index.module.css";

const Data = ({ allTodoList, allAddress, myList, change }) => {
  // const { change } = useContext(ToDoListContext);

  console.log(allTodoList);

  return (
    <div className={Style.home_create_list}>
      {allTodoList.length === 0 ? (
        <div className={Style.noData}>No Data</div>
      ) : (
        <div>
          {allTodoList.map((el, i) => (
            <div key={i + 1} className={Style.home_create_list_app}>
              <div className={Style.lock_list}>
                <AiFillLock className={Style.lock_color} />
                {el[2]}
              </div>
              {el[3] === false ? (
                <RiCloseFill
                  onClick={() => change(el[0])}
                  className={Style.iconClose}
                />
              ) : (
                <p className={Style.down}>Done</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Data;
