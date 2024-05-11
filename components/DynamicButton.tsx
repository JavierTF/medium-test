import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { DynamicButtonProps } from "@/interfaces/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import db from "../lib/firebaseSingleton";
import { createTask, editTask } from "../utils/utils";
import { TaskContext } from "@/contexts/taskContext";

const DynamicButton: React.FC<DynamicButtonProps> = ({
  icon,
  text,
  disabled = false,
  filled = false,
  url = null,
  primary = false,
  disabledAll = false,
  setOpen,
  setTextValue,
  setDisabledAll,
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
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
      if (gContext.titleTask) {
        if (gContext.action == "add") {
          await createTask(gContext);
          gContext.dialogText = "A new task has been created! (updating...)";
          setOpen(true);
        }
        if (gContext.action == "modify") {
          await editTask(gContext.idTask, gContext.titleTask);
          gContext.dialogText = `The task ${gContext.idTask} has been modified! (updating...)`;
          setOpen(true);
        }
        gContext.dialogSeverity = "success";
      } else {
        gContext.dialogText = "Please, fill the field to add a new task :(";
        gContext.dialogSeverity = "error";
        setOpen(true);
      }
    }
  };

  const handleClickCancel = () => {
    setTextValue("");
    setDisabledAll(true);
    gContext.dialogText = "";
    gContext.action = "none";
  };

  const buttonVariant: "contained" | "outlined" = filled
    ? "contained"
    : "outlined";
  const buttonSx: React.CSSProperties = filled
    ? { backgroundColor: "#f0f0f0", color: "#001f3f", borderColor: "#f0f0f0" }
    : { color: "#666666", borderColor: "#666666" };

  if (typeof window !== "undefined") {
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
    if (windowWidth < 1230) {
      if (windowWidth < 420) {
        icon = <SaveIcon sx={{ p: 0.3 }} />;
      }
      if (gContext.action == "none" || disabledAll) {
        // text = "Add";
        icon = <CloseIcon />;
      }
    } else {
      icon = "";
      if (gContext.action == "add" && !disabledAll) {
        text = "Add";
      }
      if (gContext.action == "modify") {
        icon = <SaveIcon sx={{ p: 0.3 }} />;
        text = ".";
      }
    }
  }

  return (
    <div>
      <Button
        variant={buttonVariant}
        startIcon={icon}
        href={finalUrl}
        disabled={disabled}
        sx={{ ...buttonSx, textTransform: "none" }}
        onClick={text === "Cancel" ? handleClickCancel : handleClick}
      >
        {windowWidth >= 1230 && text}
      </Button>
    </div>
  );
};

export default DynamicButton;
