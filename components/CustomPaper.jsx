import React, { useContext, useEffect, useState, Suspense } from "react";
import Paper from "@mui/material/Paper";
import MyCard from "../src/pages/color/page";
import { TaskContext } from "@/contexts/taskContext";

import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";

function CustomPaper({ elevation = 3, sx = {} }) {
  const [taskList, setTaskList] = useState(null);
  const [dialogText, setDialogText] = useState('');
  const [open, setOpen] = useState('');
  //   const [open, setOpen] = useState(false); // Initial state for Snackbar
  const gContext = useContext(TaskContext);

  useEffect(() => {
    if (gContext.taskList) {
      setTaskList(gContext.taskList);
    }
    if (gContext.dialogText) {
        setDialogText(gContext.dialogText);
        setOpen(true)
    }
    console.log("gContext.dialogText", gContext.dialogText);
    // if (gContext.dialogText != "") {
    //     console.log("okokok");
    //     setOpen(true);
    // } else {
    //     console.log("nada");
    //     setOpen(false);
    // }
  }, [gContext.taskList, gContext.dialogText]);

  return (
    <Paper elevation={elevation} sx={{ ...sx }}>
      {!taskList ? <LinearProgress /> : <MyCard tasks={taskList} />}

      
    </Paper>
  );
}

export default CustomPaper;
