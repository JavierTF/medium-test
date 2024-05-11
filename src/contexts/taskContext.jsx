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
  const emailCounter = useRef({ count: 0 });
  const linkCounter = useRef({ count: 0 });

  const updateEmailCount = () => {
    emailCounter.current.count += 1;
  };

  const updateLinkCount = () => {
    linkCounter.current.count += 1;
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
            emailCounter: emailCounter.current,
            linkCounter: linkCounter.current,
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