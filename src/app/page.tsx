"use client";

import React, { Suspense, useEffect, useState } from "react";

import { TaskProvider } from "../contexts/taskContext";
import Container from "@mui/material/Container";
import CustomPaper from "../../components/CustomPaper";
import LinearProgress from "@mui/material/LinearProgress";
import CustomSnackbar from "../../components/CustomSnackbar";
import Typography from "@mui/material/Typography";

function TaskContainer() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("vpnInfo") === null) {
      setOpen(true);
    }
  }, []);

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
          {/* Copyrights */}
          <Typography
            variant="subtitle2"
            sx={{ color: "gray", pt: 3 }}
            align="center"
          >
            © All rights reserved by 
            <a
              href="https://portfolio-javier-toussent-fis.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ paddingLeft: "4px", textDecoration: "underline" }}
            >
               Sr. Fullstack Javier Toussent Fis
            </a>
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ color: "gray", fontSize: 12 }}
            align="center"
          >
            <a
              href="https://github.com/JavierTF/medium-test"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2C7FBF" }}
            >
              Click to see this application code
            </a>
          </Typography>
        </Container>
      </Suspense>
    </TaskProvider>
  );
}

export default TaskContainer;
