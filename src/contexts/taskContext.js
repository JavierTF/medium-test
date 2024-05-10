import React, { createContext, useState, useEffect, useRef } from "react";
import { getDatabase, ref, get } from "firebase/database";
import db from "../../lib/firebaseSingleton";
import Task from "../interfaces/interfaces";
// import { getTasks } from "../../utils/utils";

export const TaskContext = createContext({
  tasks: null,
  emailCountRef: 0,
  linkCountRef: 0,
  titleTask: "",
  dialogText: "",
  dialogSeverity: "success",
  action: "none",
  idTask: "",
});

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const snapshot = await get(ref(db, "/tasks"));
        const tasksData = snapshot.val();
        if (tasksData) {
          const tasksArray = Object.values(tasksData);
          setTaskList(tasksArray);
          // return tasksArray;
        }
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    getTasks();
  }, []);

  return (
    <React.Fragment>
      {taskList ? (
        <TaskContext.Provider value={{ taskList }}>
          {children}
        </TaskContext.Provider>
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};
