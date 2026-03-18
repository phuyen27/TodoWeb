export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  return (
    <div className={`task ${task.completed ? "done" : ""}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={()=>onToggle(task)}
        />

        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <div className="meta">
            <span className={`priority ${task.priority}`}>
              {task.priority}
            </span>

            {task.dueDate && (
              <span className="date">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="text-orange-400" onClick={()=>onEdit(task)}>Edit</button>
        <button onClick={()=>onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}