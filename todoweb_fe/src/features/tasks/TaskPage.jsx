import './TaskPage.css';
// features/tasks/TasksPage.jsx

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import useTasks from "./hooks/useTasks";

import TaskForm from "./components/TaskForm";
import TaskToolbar from "./components/TaskToolbar";
import TaskList from "./components/TaskList";
import EditTaskModal from "./components/EditTaskModal";

import GetPet from '../pet/components/GetPet';

export default function TasksPage() {
  const { tasks, createTask, toggleTask, updateTask, deleteTask } = useTasks();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  });

  const [editingTask, setEditingTask] = useState(null);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = tasks
    .filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(t => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });

  return (
    <div className="layout">
      <Sidebar />

      <div className="tasks-page">
        <GetPet />
        <h1>My Tasks</h1>

        <TaskForm
            title={form.title}
            setTitle={(v) => setForm({ ...form, title: v })}

            description={form.description}
            setDescription={(v) => setForm({ ...form, description: v })}

            priority={form.priority}
            setPriority={(v) => setForm({ ...form, priority: v })}

            dueDate={form.dueDate}
            setDueDate={(v) => setForm({ ...form, dueDate: v })}

            onCreate={() => {
                if (!form.title.trim()) return;
                createTask(form);
                setForm({
                title: "",
                description: "",
                priority: "medium",
                dueDate: ""
                });
            }}
            />

        <TaskToolbar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <TaskList
          tasks={filtered}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={setEditingTask}
        />

        <EditTaskModal
          task={editingTask}
          setTask={setEditingTask}
          onSave={() => {
            updateTask(editingTask);
            setEditingTask(null);
          }}
          onCancel={() => setEditingTask(null)}
        />
      </div>
    </div>
  );
}