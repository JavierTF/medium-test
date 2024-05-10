"use client";

import React, { Suspense } from "react";

import { TaskProvider } from "../contexts/taskContext";
import { SnackbarProvider } from "../contexts/SnackbarContext";
import Container from "@mui/material/Container";
import CustomPaper from "../../components/CustomPaper";

function TaskContainer() {
  return (
    <TaskProvider>
      {/* <SnackbarProvider> */}
      <Suspense fallback={<div>Loading...</div>}>
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
