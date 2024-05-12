import React, { useState, useEffect, useContext, useRef } from "react";
import { TaskContext } from "@/contexts/taskContext";

// MUI Components
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";


// MUI Icons
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import AdjustIcon from "@mui/icons-material/Adjust";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

// Next.js
import Image from "next/image";

// Custom Components
import StringTypography from "../../../components/StringTypography";
import DynamicButton from "../../../components/DynamicButton";
import StringButton from "../../../components/StringButton";
import CustomSnackbar from "../../../components/CustomSnackbar";

// Utils
import { findById, deleteTask, colors } from "../../../utils/utils";

// Interfaces
import { MyCardProps } from "@/interfaces/interfaces";

function MyCard({ tasks }: MyCardProps) {
  const [started, setStarted] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [colored, setColored] = useState(true);
  const [disabledAll, setDisabledAll] = useState(true);
  const [checked, setChecked] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const emailRef = useRef(1);
  const linkRef = useRef(1);

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
  };

  const handleClickDelete = async (idTask: string) => {
    if (tasks && tasks.length > 0) {
      gContext.action = "delete";
      gContext.dialogText = "The task has been deleted! (updating...)";
      gContext.dialogSeverity = "info";
      await deleteTask(idTask);
      setChecked(false);
      setOpen(true);
    }
  };

  const handleClickCheckbox = (e: any, idTask: string) => {
    // console.log("counterRef.current", counterRef.current);
    // counterRef.current += 1;

    if (tasks && tasks.length > 0) {
      const task = findById(tasks, idTask);
      if (task) {
        if (e.target.checked) {
          setDisabledAll(false);
          setTextValue(task.title);
          gContext.action = "modify";
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

  const handleClickAvatar = () => {
    window.open("https://portfolio-javier-toussent-fis.vercel.app/", "_blank")
  };

  return (
    <div>
      {/* BeforeStarted Componente */}
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
      {/* AfterStarted Component */}
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
              <Tooltip title="Go to my portfolio">
                <Box
                  onClick={handleClickAvatar}
                  onMouseEnter={() => {
                    document.body.style.cursor = "pointer"; // Change cursor to pointer
                  }}
                  onMouseLeave={() => {
                    document.body.style.cursor = "default"; // Reset cursor to default
                  }}
                >
                  <Image
                    src="/images/about.jpg"
                    alt="Avatar"
                    width={32}
                    height={29}
                    style={{
                      borderRadius: "50%",
                      opacity: disabledAll ? 0.5 : 1,
                    }}
                  />
                </Box>
              </Tooltip>
            </Stack>
            {/* TasksList Component */}
            {!tasks ? (
              <Skeleton />
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <Stack
                  key={task.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Checkbox
                    key={task.id}
                    onClick={(e) => handleClickCheckbox(e, task.id)}
                    disabled={checked && task.id !== gContext.idTask}
                  />
                  <StringButton
                    text={task.title}
                    emailRef={emailRef}
                    linkRef={linkRef}
                  />
                  <IconButton
                    onClick={() =>
                      alert("The functionality will be developed soon ")
                    }
                    disabled={checked}
                  >
                    <CheckIcon color={checked ? "disabled" : "primary"} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleClickDelete(task.id)}
                    disabled={checked}
                  >
                    <DeleteIcon color={checked ? "disabled" : "primary"} />
                  </IconButton>
                </Stack>
              ))
            ) : null}
          </Card>
          {/* ButtonsFooter Component */}
          <CardContent
            sx={{
              backgroundColor: "#FAFCFB",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={2}
                md={1.3}
                lg={1.3}
                xl={1.3}
                sm={1.3}
                sx={
                  windowWidth < 420
                    ? { pb: 1, mr: 1, justifyContent: "left" }
                    : {}
                }
              >
                <DynamicButton
                  icon={<OpenInFullIcon />}
                  text={"Open"}
                  disabled={disabledAll}
                  filled={true}
                  setOpen={setOpen}
                />
              </Grid>
              <Grid
                item
                xs={9.7}
                md={9}
                lg={9}
                xl={9}
                sm={9}
                sx={windowWidth < 420 ? { pb: 1, justifyContent: "right" } : {}}
              >
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
              <Grid item xs={12} md={1.7} lg={1.7} xl={1.7} sm={1.7}>
                <Stack direction="row" spacing={1} justifyContent={"flex-end"}>
                  <DynamicButton
                    icon={null}
                    text={"Cancel"}
                    filled={true}
                    url={null}
                    setTextValue={setTextValue}
                    setDisabledAll={setDisabledAll}
                  />
                  <DynamicButton
                    icon={<CloseIcon />}
                    text={"Ok"}
                    filled={true}
                    url={null}
                    primary={true}
                    disabledAll={disabledAll}
                    setOpen={setOpen}
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          
          {/* CustomSnackbar Component */}
          {open && (
            <CustomSnackbar
              open={open}
              message={gContext.dialogText}
              severity={gContext.dialogSeverity}
              setOpen={setOpen}
              duration={5000}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default MyCard;
