import React, { createContext, useState, useEffect, useRef } from "react";
import { ref, get } from "firebase/database";
import db from "../../lib/firebaseSingleton";
import LinearProgress from "@mui/material/LinearProgress";

export const TaskContext = createContext({
  tasks: [],
  emailCounter: {},
  linkCounter: {},
  updateEmailCount: () => {},
  updateLinkCount: () => {},
  titleTask: "",
  dialogText: "",
  dialogSeverity: "success",
  action: "none",
  idTask: "",
});

export const TaskProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);
  const emailCounter = useRef({ count: 0 }); // Convertir a useRef
  const linkCounter = useRef({ count: 0 }); // Convertir a useRef

  const updateEmailCount = () => {
    emailCounter.current.count += 1; // Actualizar emailCounter con useRef
  };

  const updateLinkCount = () => {
    linkCounter.current.count += 1; // Actualizar linkCounter con useRef
  };

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
        <TaskContext.Provider
          value={{
            taskList,
            emailCounter: emailCounter.current, // Acceder al valor actual de useRef
            linkCounter: linkCounter.current, // Acceder al valor actual de useRef
            updateEmailCount,
            updateLinkCount,
            titleTask: "",
            dialogText: "",
            dialogSeverity: "success",
            action: "none",
            idTask: "",
          }}
        >
          {children}
        </TaskContext.Provider>
      ) : (
        <LinearProgress />
      )}
    </React.Fragment>
  );
};