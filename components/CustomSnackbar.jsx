import React, { useContext, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { TaskContext } from "@/contexts/taskContext";

function CustomSnackbar({ open, message, severity }) {
    const gContext = useContext(TaskContext);

    // useEffect(() => {

    // }, [gContext.dialogText])

    const handleClose = () => {
        gContext.dialogText = ''
    }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message} sdf
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;