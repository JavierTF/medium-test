import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { colors, changeColor, lightenColor, counterSingleton } from "../utils/utils.js";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NumbersIcon from "@mui/icons-material/Numbers";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AnimationIcon from "@mui/icons-material/Animation";
import { TaskContext } from "@/contexts/taskContext";

const StringButton = ({ text }) => {
  const words = text.split(" ");
  const gContext = useContext(TaskContext);

  useEffect(() => {
    // Solo actualizar contadores cuando el texto cambie
    // y no en cada renderizado del componente
    words.forEach(word => {
      if (word.toLowerCase() === "link") {
        // gContext.updateLinkCount(gContext.linkCounter.count + 1);
        gContext.updateLinkCount();
      } else if (word.toLowerCase() === "mail") {
        gContext.updateEmailCount();
        // gContext.updateEmailCount(gContext.emailCounter.count + 1);
      }
    });
  }, [text]); // Dependencia actualizada: solo se ejecutará cuando cambie el texto

  return (
    <div style={{ width: "93%" }}>
      {words.map((word, index) => {
        const color = changeColor(word);
        let icon = null;
        let displayText = word;

        if (color === colors["email"]) {
          icon = <MailOutlineIcon />;
          displayText = `Mail ${gContext.emailCounter.count}`; // Mostrar contador de email
          gContext.updateEmailCount(); // Incrementar contador de email
          // gContext.updateEmailCount(gContext.emailCounter.count + 1); // Incrementar contador de email
        } else if (color === colors["link"]) {
          icon = <AnimationIcon />;
          displayText = `Link ${gContext.linkCounter.count}`; // Mostrar contador de link
          // gContext.updateLinkCount(gContext.linkCounter.count + 1); // Incrementar contador de link
          gContext.updateLinkCount(); // Incrementar contador de link
        } else if (color === colors["#"]) {
          icon = <NumbersIcon />;
        } else if (color === colors["@"]) {
          icon = <AlternateEmailIcon />;
        }

        return (
          <React.Fragment key={index}>
            {color === colors["default"] ? (
              <Typography variant="caption" sx={{ fontSize: 14 }}>
                {word}
              </Typography>
            ) : (
              <Button
                variant="text"
                sx={{
                  backgroundColor: lightenColor(color),
                  borderRadius: "25px",
                  color: color,
                  py: 0.2,
                  fontSize: 12,
                }}
                startIcon={icon}
              >
                {displayText}
              </Button>
            )}
            {index !== words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StringButton;