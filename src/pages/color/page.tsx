import React, { useState, useEffect, useContext } from "react";
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
import { findById, isValidTitle, deleteTask } from "../../../utils/utils";

import { MyCardProps } from "@/interfaces/interfaces";
import { Task } from "@/interfaces/interfaces";

import db from "../../../lib/firebaseSingleton";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import {
  getDatabase,
  ref,
  onValue,
  off,
  set,
  remove,
  get,
} from "firebase/database";
import { fetchTasks } from "../../../lib/fetchTask";
import { TaskContext } from "@/contexts/taskContext";
import DeleteIcon from "@mui/icons-material/Delete";

function MyCard({ tasks }: MyCardProps) {
  const [started, setStarted] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [colored, setColored] = useState(true);
  const [disabledAll, setDisabledAll] = useState(true);
  const [checked, setChecked] = useState(false);

  const gContext = useContext(TaskContext);

  useEffect(() => {}, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    setTextValue(data);
    gContext.titleTask = data;
    setDisabledAll(data === "");
    if (!checked) {
      gContext.action = "add";
    }
    if (data === "") {
      gContext.action = "none";
    }
  };

  const handleBlur = () => {
    setColored(true);
  };

  const handleClickToStart = () => {
    setStarted(true);
    gContext.action = "add";
  };

  const handleClick = () => {
    setColored(false);
    if (gContext.action && gContext.action === "none") {
      gContext.action = "add";
    }
    // if (textValue) {
    //   if (checked) {
    //     gContext.action = "modify";
    //   }
    // }
  };

  const handleClickDelete = async (idTask: string) => {
    // with no confirmation for deleting
    console.log("borrando");
    if (tasks && tasks.length > 0) {
      console.log("la encontre");
      await deleteTask(idTask);
      setChecked(false);
    }
    gContext.action = "delete";
  };

  const handleClickCheckbox = (e: any, idTask: string) => {
    if (tasks && tasks.length > 0) {
      const task = findById(tasks, idTask);
      if (task) {
        if (e.target.checked) {
          console.log(task.title);
          setDisabledAll(false);
          setTextValue(task.title);
          gContext.action = "modify";
          console.log("idTask", idTask);
          gContext.idTask = idTask;
          gContext.titleTask = task.title;
        } else {
          setDisabledAll(true);
          setTextValue("");
          gContext.action = "none";
          gContext.idTask = "";
          gContext.titleTask = "";
        }
      }
      setChecked(e.target.checked);
    }
  };

  return (
    <div>
      {!started && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ justifyContent: "space-between", width: "99%" }}
        >
          <IconButton onClick={handleClickToStart}>
            <AddCircleOutlineIcon color={!checked ? "primary" : "disabled"} />
          </IconButton>
          <Box onClick={handleClick} sx={{ width: "98%" }}>
            <StringTypography
              text={!disabledAll ? textValue : "Type to add a new task"}
              sx={disabledAll ? { color: "grey" } : undefined}
            />
          </Box>
        </Stack>
      )}
      {started && (
        <React.Fragment>
          <Card variant="outlined" sx={{ borderRadius: "1px" }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ justifyContent: "space-between", width: "99%" }}
            >
              <IconButton
                onClick={handleClick}
                disabled={!disabledAll || checked}
              >
                <AddCircleOutlineIcon
                  color={!checked ? "primary" : "disabled"}
                />
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
                  placeholder="Type to add a new task"
                  sx={{ width: "94%" }}
                />
              )}
              {colored && (
                <Box onClick={handleClick} sx={{ width: "94%" }}>
                  <StringTypography
                    text={!disabledAll ? textValue : "Type to add a new task"}
                    sx={disabledAll ? { color: "grey" } : undefined}
                  />
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
            {tasks &&
              tasks.length > 0 &&
              tasks.map((task) => (
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  key={task.id}
                >
                  <Checkbox
                    key={task.id}
                    onClick={(e) => handleClickCheckbox(e, task.id)}
                    disabled={checked && task.id != gContext.idTask}
                  />
                  <StringButton text={task.title}></StringButton>
                  <IconButton
                    onClick={() => handleClickDelete(task.id)}
                    disabled={checked}
                  >
                    <DeleteIcon color={!checked ? "primary" : "disabled"} />
                  </IconButton>
                </Stack>
              ))}
          </Card>
          <CardContent
            sx={{
              backgroundColor: "#FAFCFB",
              // height: "30px",
            }}
          >
            <Grid container>
              <Grid item xl={1.3} sm={12}>
                <DynamicButton
                  icon={<OpenInFullIcon />}
                  text={"Open"}
                  disabled={disabledAll}
                  filled={true}
                />
              </Grid>
              <Grid item xl={9} sm={12}>
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
                    text={"Highlight"}
                    disabled={disabledAll}
                  />
                  <DynamicButton
                    icon={<AdjustIcon />}
                    text={"Estimation"}
                    disabled={disabledAll}
                  />
                </Stack>
              </Grid>
              <Grid item xl={1.7} sm={12}>
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
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </React.Fragment>
      )}
    </div>
  );
}

// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const Task: Task = await res.json()
//   // Pass data to the page via props
//   return { props: { Task } }
// }) satisfies GetServerSideProps<{ Task: Task }>

export default MyCard;
