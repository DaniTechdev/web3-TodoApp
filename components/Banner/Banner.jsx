import React from "react";

//Internal import
import Style from "./Banner.module.css";
import AddFrom from "../Addform/AddFrom";

const Banner = ({ setopenAddform, openAddform, toDoList }) => {
  return (
    <div className={Style.container}>
      <div className={Style.heading}>CREATE AND MANAGE TASKS ONCHAIN</div>
      <button onClick={() => setopenAddform(true)}>Add Task </button>

      {openAddform ? (
        <AddFrom
          setopenAddform={setopenAddform}
          openAddform={openAddform}
          toDoList={toDoList}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Banner;
