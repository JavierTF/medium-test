"use client";

import React, { Suspense } from "react";

import { TaskProvider } from "../contexts/taskContext";
import { SnackbarProvider } from "../contexts/SnackbarContext";
import Container from "@mui/material/Container";
import CustomPaper from "../../components/CustomPaper";
import LinearProgress from '@mui/material/LinearProgress';

function TaskContainer() {
  return (
    <TaskProvider>
      {/* <SnackbarProvider> */}
      <Suspense fallback={<LinearProgress />}>
        <Container maxWidth="xl" sx={{ height: "650px" }}>
          <br />
          <CustomPaper />
        </Container>
      </Suspense>
      {/* </SnackbarProvider> */}
    </TaskProvider>
  );
}

export default TaskContainer;
