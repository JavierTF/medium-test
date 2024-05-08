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

// import tasks from '../../../lib/tasks.json';

import { MyCardProps } from "@/interfaces/interfaces";
import { Task } from "@/interfaces/interfaces";

function MyCard({ tasks }: MyCardProps) {
  const [textValue, setTextValue] = useState("");
  const [colored, setColored] = useState(true);
  const [disabledAll, setDisabledAll] = useState(true);

  tasks = [
    {
      id: 1,
      title: "Hacer la #compra",
      description: "Comprar leche, huevos y pan en https://wwww.my-bread.com",
      created_at: "2024-05-05T08:00:00",
      finished_at: null,
    },
    {
      id: 2,
      title: "Llamar al @médico",
      description: "Pedir #cita para la revisión anual.",
      created_at: "2024-05-05T09:00:00",
      finished_at: null,
    },
    {
      id: 3,
      title: "Preparar la #presentación",
      description: "Terminar la presentación para el #trabajo y enviar a xavi@aleph.engineering",
      created_at: "2024-05-05T10:00:00",
      finished_at: "2024-05-05T12:00:00",
    },
    {
      id: 4,
      title: "Salir a correr",
      description: "#Correr durante 30 minutos en el parque con @dayitecnologia.",
      created_at: "2024-05-05T13:00:00",
      finished_at: null,
    },
    {
      id: 5,
      title: "Enviar el informe",
      description: "Enviar el informe semanal al @jefe.",
      created_at: "2024-05-05T14:00:00",
      finished_at: "2024-05-05T16:00:00",
    },
  ];

  console.log(tasks);

  // const [status, setStatus] = useState<"empty" | "filled">("empty");

  useEffect(() => {
    // if (tasks.length > 0) {
    //   setStatus("filled");
    // }

    return () => {
      // Lógica de limpieza si es necesario
    };
  }, [tasks]);

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
  };

  const handleClickCheckbox = () => {
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
            style={{ borderRadius: "50%", opacity: 0.5 }}
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
            <Checkbox onClick={handleClickCheckbox(task.id)} />
            <StringButton text={`${task.title} ${task.description}`}></StringButton>
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
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
}

export default MyCard;
