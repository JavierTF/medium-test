'use client'

import React from "react";
import tasks from '../../lib/tasks.json';
import MyCard from "../pages/color/page";

function TaskContainer() {
  return <MyCard tasks={tasks} />;
}

export default TaskContainer;