import React, { createContext, useState, useEffect } from "react";
const { getDatabase, ref, get, set } = require("firebase/database");
import db from "../../lib/firebaseSingleton";

export const TaskContext = createContext();

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
          console.log(tasksArray);
        }
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    getTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ taskList }}>{children}</TaskContext.Provider>
  );
};
