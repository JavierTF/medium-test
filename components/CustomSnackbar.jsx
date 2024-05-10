import React, { useContext, useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { TaskContext } from "@/contexts/taskContext";
import { SnackbarProvider } from "@/contexts/SnackbarContext";

function CustomSnackbar({ open, message, severity, setOpen }) {
  // const [open, setOpen] = useState(false);
  //   const { isOpen, setOpen } = useContext(SnackbarProvider);

  const gContext = useContext(TaskContext);

  console.log("message", message);

  // useEffect(() => {
  //   if (gContext.dialogText !== "" && typeof gContext.dialogText !== undefined){
  //       setOpen(true)
  //   }
  // }, [gContext.dialogText]);

  const handleClose = () => {
    gContext.dialogText = "";
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        // open={open}
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
