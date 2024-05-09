import React, { createContext, useState, useEffect, useRef } from "react";
import { getDatabase, ref, get } from "firebase/database";
import db from "../../lib/firebaseSingleton";
import Task from "../interfaces/interfaces";

export const TaskContext = createContext({
  tasks: null,
  emailCountRef: 0,
  linkCountRef: 0,
  titleTask: '',
  openDialog: false,
  action: 'none',
  idTask: '',
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
          console.log("tasksArray!!!", tasksArray);
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
      ) : <div>Loading...</div>}
    </React.Fragment>
  );
};
