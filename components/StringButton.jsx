import React, { useEffect, useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  colors,
  changeColor,
  lightenColor,
  counterSingleton,
  getWordCounters,
  getWordCountersSingleton,
  isValidEmail,
  isValidLink,
} from "../utils/utils.js";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NumbersIcon from "@mui/icons-material/Numbers";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AnimationIcon from "@mui/icons-material/Animation";
import { TaskContext } from "@/contexts/taskContext";

const StringButton = ({ text, emailRef, linkRef }) => {
  const words = text.split(" ");

  const getEmailCount = useMemo(() => emailRef.current, [emailRef]);
  const getLinkCount = useMemo(() => linkRef.current, [linkRef]);

  const wordCounters = [];

  for (let i = 0; i < words.length; i++) {
    if (isValidEmail(words[i])) {
      wordCounters.push([words[i], getEmailCount]);
      emailRef.current += 1;
    } else if (isValidLink(words[i])) {
      wordCounters.push([words[i], getLinkCount]);
      linkRef.current += 1;
    } else {
      wordCounters.push([words[i], null]);
    }
  }

  const elements = [];

  for (let index = 0; index < wordCounters.length; index++) {
    const word = wordCounters[index];    
    const color = changeColor(word[0]);
    let icon = null;
    let displayText = word[0];

    if (color === colors["email"]) {
      icon = <MailOutlineIcon />;
      displayText = `Mail ${word[1]}`;
    } else if (color === colors["link"]) {
      icon = <AnimationIcon />;
      displayText = `Link ${word[1]}`;
    } else if (color === colors["#"]) {
      icon = <NumbersIcon />;
    } else if (color === colors["@"]) {
      icon = <AlternateEmailIcon />;
    }

    elements.push(
      <React.Fragment key={index}>
        {color === colors["default"] ? (
          <Typography variant="caption" sx={{ fontSize: 14 }}>
            {word[0]}
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
            {color === colors["#"] || color === colors["@"]
              ? displayText.slice(1)
              : displayText}
          </Button>
        )}
        {index !== wordCounters.length - 1 && " "}
      </React.Fragment>
    );
  }

  return <div style={{ width: "93%" }}>{elements}</div>;
};

export default StringButton;
