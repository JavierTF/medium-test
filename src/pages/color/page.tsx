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
import { findById, isValidTitle } from "../../../utils/utils";

import { MyCardProps } from "@/interfaces/interfaces";
import { Task } from "@/interfaces/interfaces";

import db from "../../../lib/firebaseSingleton";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getDatabase, ref, onValue, off, set } from "firebase/database";
import { fetchTasks } from "../../../lib/fetchTask";
import { TaskContext } from "@/contexts/taskContext";


function MyCard({ tasks }: MyCardProps) {
  const [started, setStarted] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [colored, setColored] = useState(true);
  const [disabledAll, setDisabledAll] = useState(true);
  const [checked, setChecked] = useState(false);
  const [action, setAction] = useState("none");
  
  // const [tasks, setTasks] = useState([]);

  const contexto = useContext(TaskContext);

  useEffect(() => {
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    setTextValue(data);
    contexto.titleTask = data;
    // if (isValidTitle(data)) {
    //   console.log("data", data);
    //   console.log("contexto", contexto);
    // }
    setDisabledAll(data === "");
  };

  const handleBlur = () => {
    setColored(true);
  };

  const handleClickToStart = () => {
    setStarted(true);
  };

  const handleClick = () => {
    setColored(false);
    setAction("add");
  };

  const handleClickCheckbox = (idTask: number, isChecked: boolean) => {
    if (tasks && tasks.length > 0) {
      const task = findById(tasks, idTask);
      if (task) {
        if (isChecked) {
          console.log(task.title);
          setDisabledAll(false);
          setTextValue(task.title);
          setAction("modify");
        } else {
          setDisabledAll(true);
          setTextValue("");
          setAction("none");
        }
      }
      setChecked(isChecked);
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
                  // sx={{ justifyContent: "space-between", width: "99%" }}
                  key={task.id}
                >
                  <Checkbox
                    onClick={(e) =>
                      handleClickCheckbox(task.id, e.target.checked)
                    }
                  />
                  <StringButton text={task.title}></StringButton>
                </Stack>
              ))}
          </Card>
          <CardContent
            sx={{
              backgroundColor: "#FAFCFB",
              // height: "30px",
            }}
          >
            <Grid container sx={{ mt: 0 }}>
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
