export default function EditTaskModal({ task, setTask, onSave, onCancel }) {
  if (!task) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Task</h2>

        <input
          value={task.title}
          onChange={e=>setTask({...task, title:e.target.value})}
        />

        <input
          value={task.description}
          onChange={e=>setTask({...task, description:e.target.value})}
        />

        <select
          value={task.priority}
          onChange={e=>setTask({...task, priority:e.target.value})}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          value={task.dueDate?.slice(0,10)}
          onChange={e=>setTask({...task, dueDate:e.target.value})}
        />

        <button onClick={onSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}