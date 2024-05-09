import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { DynamicButtonProps } from "@/interfaces/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { tasks } from "../lib/tasks";
import db from "../lib/firebaseSingleton";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getDatabase, ref, onValue, off, set } from "firebase/database";
import { fetchTasks } from "../lib/fetchTask";
import { getCurrentDateTimeAsString, isValidTitle, createTask } from "../utils/utils";
import { TaskContext } from "@/contexts/taskContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const DynamicButton: React.FC<DynamicButtonProps> = ({
  icon,
  text,
  disabled = false,
  filled = false,
  url = null,
  primary = false,
  disabledAll = false,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const gContext = useContext(TaskContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (primary && db) {
      console.log("contexto.titleTask", gContext.titleTask);
      console.log("contexto", gContext);
      if (gContext.titleTask) {
        await createTask(gContext, db);
      } else {
        console.log("entre");
        setOpen(true);
      }
    }
  };

  const handleCloseSnackBar = () => {
    setOpen(false);
  };

  const buttonVariant: "contained" | "outlined" = filled
    ? "contained"
    : "outlined";
  const buttonSx: React.CSSProperties = filled
    ? { backgroundColor: "#f0f0f0", color: "#001f3f", borderColor: "#f0f0f0" }
    : { color: "#666666", borderColor: "#666666" };

  if (typeof window !== "undefined") {
    // Verificar si window está disponible
    if (windowWidth < 1230) {
      buttonSx.paddingRight = 0;
    }
  }

  if (primary) {
    buttonSx.backgroundColor = "#0D55CE";
    buttonSx.color = "white";
  }

  if (text === "Cancel" && windowWidth < 1230) {
    buttonSx.visibility = "hidden";
  }

  const finalUrl = url ?? "#";

  icon = icon ?? "";

  if (primary) {
    icon = "";
    if (gContext.action == "add" && !disabledAll) {
      // icon = <CloseIcon />;
      text = "Add";
    }
    if (gContext.action == "modify") {
      icon = <SaveIcon sx={{ p: 0.3 }} />;
      text = "";
    }
    // if (contexto.action == 'none') {
    //   icon = "";
    //   text = "Ok";
    // }
    // if (!disabledAll) {
    //   icon = "";
    //   text = "Ok"
    // }
    // else {
    //   text = "Add";
    // }
  }

  return (
    <div>
      <Button
        variant={buttonVariant}
        startIcon={icon}
        href={finalUrl}
        disabled={disabled}
        sx={{ ...buttonSx, textTransform: "none" }}
        onClick={handleClick}
      >
        {windowWidth >= 1230 && text}
      </Button>
      {open && (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleCloseSnackBar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            onClose={handleCloseSnackBar}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Please, fill the field to add a new task.
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default DynamicButton;
