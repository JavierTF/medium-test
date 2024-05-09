import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MyCard from "../src/pages/color/page";
import { TaskContext } from "@/contexts/taskContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CustomSnackbar from "../components/CustomSnackbar";

function CustomPaper({ elevation = 3, sx = {} }) {
  const [taskList, setTaskList] = useState([]);
  const [open, setOpen] = useState(false); // Initial state for Snackbar
  const gContext = useContext(TaskContext);

  useEffect(() => {
    // Update taskList and potentially trigger CustomSnackbar render
    if (gContext.taskList) {
      setTaskList(gContext.taskList);
    }
    console.log("gContext.dialogText", gContext.dialogText);
    if (gContext.dialogText && gContext.dialogText.length > 0) {
      // More concise check for truthy dialogText
      setOpen(true); // Set open state for Snackbar on dialogText change
    } else {
      setOpen(false); // Close Snackbar if dialogText becomes empty/falsy
    }
  }, [gContext.taskList, gContext.dialogText, gContext]);

  return (
    <Paper elevation={elevation} sx={{ ...sx }}>
      <MyCard tasks={taskList} />
      {open && (
        <CustomSnackbar
          open={open}
          message={gContext.dialogText}
          severity={gContext.dialogSeverity}
        />
      )}
    </Paper>
  );
}

export default CustomPaper;
