// features/tasks/services/taskService.js

import api from "../../../api/api";

export const getTasks = () =>
  api.get("/tasks", { params: { size: 50 } });

export const createTaskApi = (data) =>
  api.post("/tasks", data);

export const updateTaskApi = (id, data) =>
  api.patch(`/tasks/${id}`, data);

export const deleteTaskApi = (id) =>
  api.delete(`/tasks/${id}`);