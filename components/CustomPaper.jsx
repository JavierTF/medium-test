import React, { useContext, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import MyCard from "../src/pages/color/page";
import { TaskContext } from "@/contexts/taskContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CustomSnackbar from "../components/CustomSnackbar";

function CustomPaper({ elevation = 3, sx = {} }) {
  const [taskList, setTaskList] = useState([]);
  const gContext = useContext(TaskContext);

  useEffect(() => {
    // Update taskList and potentially trigger CustomSnackbar render on changes
    console.log("gContext.dialogText", gContext.dialogText);
    if (gContext.taskList) {
      setTaskList(gContext.taskList);
    }
    if (gContext.dialogText !== "") {
      gContext.dialogText = "";
      // No need to check for empty string here (handled in CustomSnackbar)
    }
  }, [gContext.taskList, gContext.dialogText]);

  return (
    <Paper elevation={elevation} sx={{ ...sx }}>
      <MyCard tasks={taskList} />
      {gContext.dialogText && gContext.dialogText.length > 0 && (
        <CustomSnackbar
          open={gContext.dialogText !== ""}
          message={gContext.dialogText}
          severity={gContext.dialogSeverity}
        />
      )}
    </Paper>
  );
}

export default CustomPaper;
