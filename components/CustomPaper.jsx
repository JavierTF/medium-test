import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MyCard from "../src/pages/color/page";
import { TaskContext } from "@/contexts/taskContext";

function CustomPaper({ elevation = 3, sx = {} }) {
  const [taskList, setTaskList] = useState([]);
  const contexto = useContext(TaskContext);

  useEffect(() => {
    // console.log('mi contexto`', contexto)
    if (contexto.taskList){
        console.log("tasks context", contexto.taskList);
        setTaskList(contexto.taskList);
    }
  }, [contexto.taskList]);

  return (
    <Paper elevation={elevation} sx={{ ...sx }}>
      <MyCard tasks={taskList} />
    </Paper>
  );
}

export default CustomPaper;
