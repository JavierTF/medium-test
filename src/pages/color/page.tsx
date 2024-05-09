import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import StringTypography from "../../../components/StringTypography";
import DynamicButton from "../../../components/DynamicButton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AdjustIcon from "@mui/icons-material/Adjust";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Checkbox from "@mui/material/Checkbox";
import StringButton from "../../../components/StringButton";
import { findById } from "../../../utils/utils";

import { tasks } from "../../../lib/tasks";

import { MyCardProps } from "@/interfaces/interfaces";
import { Task } from "@/interfaces/interfaces";

// function MyCard({ tasks }: MyCardProps) {
function MyCard() {
  const [textValue, setTextValue] = useState("");
  const [colored, setColored] = useState(true);
  const [disabledAll, setDisabledAll] = useState(true);
  const [checked, setChecked] = useState(false);
  const [action, setAction] = useState("none");
  // const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log(action);
    // if (tasks.length > 0) {
    //   setStatus("filled");
    // }

    return () => {
      // Lógica de limpieza si es necesario
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    setTextValue(data);
    setDisabledAll(data === "");
  };

  const handleBlur = () => {
    setColored(true);
  };

  const handleClick = () => {
    setColored(false);
    setAction("add");
  };

  const handleClickCheckbox = (idTask: number, isChecked: boolean) => {
    const task = findById(tasks, idTask);
    if (task) {
      if (isChecked) {
        console.log(task.title);
        setTextValue(task.title);
        setAction("modify");
      } else {
        setTextValue("");
        setAction("none");
      }
    }
    setChecked(isChecked);
  };

  return (
    <div>
      <Card variant="outlined" sx={{ borderRadius: "1px" }}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ justifyContent: "space-between", width: "99%" }}
        >
          <IconButton onClick={handleClick} disabled={!disabledAll || checked}>
            <AddCircleOutlineIcon color={"primary"} />
          </IconButton>
          {!colored && (
            <TextField
              id="outlined-basic"
              variant="standard"
              fullWidth
              value={textValue}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              sx={{ width: "94%" }}
            />
          )}
          {colored && (
            <Box onClick={handleClick} sx={{ width: "94%" }}>
              <StringTypography text={textValue} />
            </Box>
          )}
          <Image
            src="/images/about.jpg"
            alt="Avatar"
            width={32}
            height={29}
            style={{ borderRadius: "50%", opacity: disabledAll ? 0.5 : 1 }}
          />
        </Stack>
        {/* Lista de tareas */}
        {tasks.map((task) => (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            // sx={{ justifyContent: "space-between", width: "99%" }}
            key={task.id}
          >
            <Checkbox
              onClick={(e) => handleClickCheckbox(task.id, e.target.checked)}
            />
            <StringButton text={task.title}></StringButton>
          </Stack>
        ))}
      </Card>
      <CardContent
        sx={{
          backgroundColor: "#FAFCFB",
          height: "16px",
        }}
      >
        <Grid container sx={{ mt: -0.9 }}>
          <Grid item xs={1.3}>
            <DynamicButton
              icon={<OpenInFullIcon />}
              text={"Open"}
              disabled={disabledAll}
              filled={true}
            />
          </Grid>
          <Grid item xs={9}>
            <Stack direction="row" spacing={1}>
              <DynamicButton
                icon={<CalendarTodayIcon />}
                text={"Today"}
                disabled={disabledAll}
              />
              <DynamicButton
                icon={<LockOpenIcon />}
                text={"Public"}
                disabled={disabledAll}
              />
              <DynamicButton
                icon={<AcUnitIcon />}
                text={"Normal"}
                disabled={disabledAll}
              />
              <DynamicButton
                icon={<AdjustIcon />}
                text={"Estimation"}
                disabled={disabledAll}
              />
            </Stack>
          </Grid>
          <Grid item xs={1.7}>
            <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
              <DynamicButton
                icon={null}
                text={"Cancel"}
                filled={true}
                url={null}
              />
              <DynamicButton
                icon={<CloseIcon />}
                text={"Ok"}
                filled={true}
                url={null}
                primary={true}
                disabledAll={disabledAll}
                actionButton={
                  !disabledAll && action == "add"
                    ? "add"
                    : action == "modify"
                    ? "modify"
                    : "none"
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
}

export default MyCard;
