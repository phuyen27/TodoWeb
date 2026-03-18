// features/tasks/hooks/useTasks.js

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const toastId = toast.loading("Creating task...");

  try {
    await createTaskApi(data);
    await loadTasks();
    toast.success("Task created!", { id: toastId });
  } catch (err) {
    toast.error("Failed to create task", { id: toastId });
  }
};

const toggleTask = async (task) => {
  const toastId = toast.loading("Updating task...");

  try {
    await updateTaskApi(task.id, {
      completed: !task.completed
    });
    await loadTasks();

    toast.success(
      task.completed ? "Marked as incomplete" : "Task completed!",
      { id: toastId }
    );
  } catch (err) {
    toast.error("Failed to update task", { id: toastId });
  }
};

const updateTask = async (task) => {
  const toastId = toast.loading("Saving changes...");

  try {
    await updateTaskApi(task.id, task);
    await loadTasks();
    toast.success("Task updated!", { id: toastId });
  } catch (err) {
    toast.error("Failed to update task", { id: toastId });
  }
};

const deleteTask = async (id) => {
  const toastId = toast.loading("Deleting task...");

  try {
    await deleteTaskApi(id);
    await loadTasks();
    toast.success("Task deleted!", { id: toastId });
  } catch (err) {
    toast.error("Failed to delete task", { id: toastId });
  }
};

  return {
    tasks,
    createTask,
    toggleTask,
    updateTask,
    deleteTask
  };
}