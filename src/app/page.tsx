"use client";

import React, { Suspense } from "react";

import { TaskProvider } from "../contexts/taskContext";
import Container from "@mui/material/Container";
import CustomPaper from "../../components/CustomPaper";

function TaskContainer() {
  return (
    <TaskProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Container maxWidth="xl" sx={{ height: "650px" }}>
          <CustomPaper />
        </Container>
      </Suspense>
    </TaskProvider>
  );
}

export default TaskContainer;
