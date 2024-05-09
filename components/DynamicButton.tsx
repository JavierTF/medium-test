import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { DynamicButtonProps } from "@/interfaces/interfaces";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { tasks } from "../lib/tasks";

const DynamicButton: React.FC<DynamicButtonProps> = ({
  icon,
  text,
  disabled = false,
  filled = false,
  url = null,
  primary = false,
  disabledAll = false,
  actionButton = "none",
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (primary) {
      console.log('----OKOKOK-----');
      tasks.push({
        id: 6,
        title: "Hacer #pruebas y #documentación",
        created_at: "2024-05-05T14:00:00",
        finished_at: "2024-05-05T16:00:00",
      });
    }
  };

  const finalUrl = url ?? "#";

  icon = icon ?? "";

  if (primary) {
    icon = "";
    if (actionButton == "add" && !disabledAll) {
      // icon = <CloseIcon />;
      text = "Add";
    }
    if (actionButton == "modify") {
      icon = <SaveIcon sx={{ p: 0.3 }} />;
      text = "";
    }
    // if (actionButton == 'none') {
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
        sx={buttonSx}
        onClick={handleClick}
      >
        {windowWidth >= 1230 && text}
      </Button>
    </div>
  );
};

export default DynamicButton;
