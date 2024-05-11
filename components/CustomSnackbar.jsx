import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { TaskContext } from "@/contexts/taskContext";

function CustomSnackbar({ open, message, severity, setOpen, duration = 5000 }) {
  const gContext = useContext(TaskContext);

  const handleClose = async () => {
    gContext.dialogText = "";
    setOpen(false);
    if (localStorage.getItem("vpnInfo") === null) {
      localStorage.setItem("vpnInfo", "hasBeenShown");
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
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
