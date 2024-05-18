import React, { useContext, useEffect, useState, Suspense } from "react";
import Paper from "@mui/material/Paper";
import MyCard from "../src/pages/color/page";
import { TaskContext } from "@/contexts/taskContext";
import LinearProgress from "@mui/material/LinearProgress";

function CustomPaper({ elevation = 3, sx = {} }) {
  const [taskList, setTaskList] = useState(null);
  const gContext = useContext(TaskContext);

  useEffect(() => {
    if (gContext.taskList) {
      setTaskList(gContext.taskList);
    }
  }, [gContext.taskList]);

  return (
    <Paper elevation={elevation} sx={{ ...sx }}>
        {!taskList ? <LinearProgress /> : <MyCard tasks={taskList} />}
    </Paper>
  );
}

export default CustomPaper;
