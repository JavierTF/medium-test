"use client";

import React, { Suspense } from "react";
import MyCard from "../pages/color/page";
import { TaskProvider } from "../contexts/taskContext";
import Container from "@mui/material/Container";

function TaskContainer() {
  return (
    <TaskProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Container maxWidth="xl" sx={{ height: '650px' }}>
          <MyCard />
        </Container>
      </Suspense>
    </TaskProvider>
  );
}

export default TaskContainer;
