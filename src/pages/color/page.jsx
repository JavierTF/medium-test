import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";

import StringTypography from "../../../components/StringTypography";
import StringButton from "../../../components/StringButton";
import DynamicButton from "../../../components/DynamicButton";

import Grid from "@mui/material/Unstable_Grid2";
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

import db from "../../../lib/firebaseSingleton";
const { getDatabase, ref, get, set } = require("firebase/database");

import { createTask } from '../../../utils/utils';

function MyTextField() {
  const [textValue, setTextValue] = useState("");
  const [colored, setColored] = useState(false);
  const [disabledAll, setDisabledAll] = useState(true);

  const handleChange = (event) => {
    let data = event.target.value;
    setTextValue(data);
    {
      data === "" ? setDisabledAll(true) : setDisabledAll(false);
    }
  };

  const handleBlur = (event) => {
    setColored(true);
  };

  const handleClick = () => {
    setColored(false);
  };

  /////////////////////////////////////////

  // const [data, setData] = useState(null);
  // const [db, setDb] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const database = db;
  //     setDb(database);
  //     console.log(db);
  //     // const taskRef = ref(db, "/tasks/");
  //     // Aquí puedes usar 'database' para interactuar con tu base de datos
  //     // Por ejemplo:
  //     // const snapshot = await ref(db, "tasks");
  //     // setData(snapshot.val());
  //   };

  //   fetchData();
  // }, []);

  // const id = 1;
  // const title = "Hacer la compra";
  // const description = "Comprar leche, huevos y pan.";
  // const created_at = "2024-05-05T08:00:00";
  // const finished_at = null;

  // createTask(id, title, description, created_at, finished_at)
  //   .then((result) => {
  //     // Maneja el resultado según el éxito o el fallo
  //     if (result.success) {
  //       console.log(result.message);
  //     } else {
  //       console.error(result.message);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  return (
    <div>
      <Card variant="outlined">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ justifyContent: "space-between", width: "100%" }}
        >
          <IconButton onClick={handleClick}>
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
            />
          )}
          {colored && (
            <Box onClick={handleClick} sx={{ width: "100%" }}>
              <StringTypography text={textValue} />
            </Box>
          )}
          <Image
            src="/images/about.jpg"
            alt="Avatar"
            width={40}
            height={36}
            style={{ borderRadius: "50%" }}
          />
        </Stack>
      </Card>
      <CardContent
        sx={{
          backgroundColor: "#FAFCFB",
          height: "16px",
          // display: "flex",
          // alignItems: "center",
        }}
      >
        {/* <Stack direction={"column"} justifyContent="center"> */}
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
          <Grid item xs={1.3}>
            <Stack direction="row" spacing={1}>
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
              />
            </Stack>
          </Grid>
        </Grid>
        {/* </Stack> */}
      </CardContent>

      {/* <StringButton
        text={
          "Hola @usuario mira este #hashtag y visita www.google.com contacta a javiertoussentfis@gmail.com o a asd@asd.com"
        }
      /> */}
    </div>
  );
}

export default MyTextField;
