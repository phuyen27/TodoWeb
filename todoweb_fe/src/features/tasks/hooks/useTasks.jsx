// features/tasks/hooks/useTasks.js

import { useEffect, useState } from "react";
import {
  getTasks,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi
} from "../services/taskService";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data.content);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async (data) => {
    await createTaskApi(data);
    loadTasks();
  };

  const toggleTask = async (task) => {
    await updateTaskApi(task.id, {
      completed: !task.completed
    });
    loadTasks();
  };

  const updateTask = async (task) => {
    await updateTaskApi(task.id, task);
    loadTasks();
  };

  const deleteTask = async (id) => {
    await deleteTaskApi(id);
    loadTasks();
  };

  return {
    tasks,
    createTask,
    toggleTask,
    updateTask,
    deleteTask
  };
}