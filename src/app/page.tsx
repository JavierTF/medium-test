"use client";

import React, { Suspense, useEffect, useState } from "react";

import { TaskProvider } from "../contexts/taskContext";
import Container from "@mui/material/Container";
import CustomPaper from "../../components/CustomPaper";
import LinearProgress from "@mui/material/LinearProgress";
import CustomSnackbar from "../../components/CustomSnackbar";

function TaskContainer() {
  const [open, setOpen] = useState(false);  

  useEffect(() => {
    if (localStorage.getItem('vpnInfo') === null){
      setOpen(true);
    }
  }, [])

  return (
    <TaskProvider>
      <Suspense fallback={<LinearProgress />}>
        <Container maxWidth="xl" sx={{ height: "650px" }}>
          <br />
          <CustomPaper />
          {open && (
            <CustomSnackbar
              open={open}
              message={"Please, turn on VPN if you are in Cuba"}
              severity={"warning"}
              setOpen={setOpen}
            />
          )}
        </Container>
      </Suspense>
    </TaskProvider>
  );
}

export default TaskContainer;
