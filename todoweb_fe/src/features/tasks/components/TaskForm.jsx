import { useState } from "react";

export default function TaskForm({
  title, setTitle,
  description, setDescription,
  priority, setPriority,
  dueDate, setDueDate,
  onCreate
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onCreate();
    setOpen(false);
  };

  if (!open) {
    return (
      <div className="add-task" onClick={() => setOpen(true)}>
        + Add task...
      </div>
    );
  }

  return (
    <div className="task-form">
      <input
        autoFocus
        placeholder="Task name..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <div className="row">
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium"> Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      </div>

      <div className="actions">
        <button className="add text-orange-400" onClick={handleSubmit}>
          Add task
        </button>
        <button className="cancel" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}