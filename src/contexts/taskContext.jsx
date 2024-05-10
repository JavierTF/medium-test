import React, { createContext, useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import db from "../../lib/firebaseSingleton";

export const TaskContext = createContext({
  tasks: [],
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
