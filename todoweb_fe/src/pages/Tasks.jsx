import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "./Tasks.css";

export default function Tasks() {

const [tasks,setTasks] = useState([]);

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [priority,setPriority] = useState("medium");
const [dueDate,setDueDate] = useState("");

const [editingTask,setEditingTask] = useState(null);

const [filter,setFilter] = useState("all");
const [search,setSearch] = useState("");

useEffect(()=>{
loadTasks();
},[]);

const loadTasks = async ()=>{

const res = await api.get("/tasks",{params:{size:50}});

setTasks(res.data.content);

};

const createTask = async ()=>{

if(!title.trim()) return;

await api.post("/tasks",{
title,
description,
priority,
dueDate
});

setTitle("");
setDescription("");
setPriority("medium");
setDueDate("");

loadTasks();

};

const toggleTask = async(task)=>{

await api.patch(`/tasks/${task.id}`,{
completed:!task.completed
});

loadTasks();

};

const deleteTask = async(id)=>{

await api.delete(`/tasks/${id}`);
loadTasks();

};

const updateTask = async()=>{

await api.patch(`/tasks/${editingTask.id}`,editingTask);

setEditingTask(null);
loadTasks();

};

const filtered = tasks
.filter(t=>t.title.toLowerCase().includes(search.toLowerCase()))
.filter(t=>{
if(filter==="active") return !t.completed;
if(filter==="completed") return t.completed;
return true;
});

return(

<div className="layout">

<Sidebar/>

<div className="tasks-page">

<h1 className="title">My Tasks</h1>

{/* CREATE */}

<div className="create">

<input
placeholder="Task title..."
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<select
value={priority}
onChange={(e)=>setPriority(e.target.value)}
>

<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>

</select>

<input
type="date"
value={dueDate}
onChange={(e)=>setDueDate(e.target.value)}
/>

<button onClick={createTask}>
Add
</button>

</div>

{/* FILTER */}

<div className="toolbar">

<input
placeholder="Search..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="filters">

<button
className={filter==="all"?"active":""}
onClick={()=>setFilter("all")}
>
All
</button>

<button
className={filter==="active"?"active":""}
onClick={()=>setFilter("active")}
>
Active
</button>

<button
className={filter==="completed"?"active":""}
onClick={()=>setFilter("completed")}
>
Completed
</button>

</div>

</div>

{/* TASK LIST */}

<div className="list">

{filtered.map(task=>(

<div
key={task.id}
className={`task ${task.completed?"done":""}`}
>

<div className="left">

<input
type="checkbox"
checked={task.completed}
onChange={()=>toggleTask(task)}
/>

<div>

<h3>{task.title}</h3>

<p>{task.description}</p>

<div className="meta">

<span className={`priority ${task.priority}`}>
{task.priority}
</span>

{task.dueDate &&
<span className="date">
{new Date(task.dueDate).toLocaleDateString()}
</span>
}

</div>

</div>

</div>

<div className="actions">

<button
className="edit"
onClick={()=>setEditingTask(task)}
>
Edit
</button>

<button
className="delete"
onClick={()=>deleteTask(task.id)}
>
Delete
</button>

</div>

</div>

))}

</div>

{/* EDIT MODAL */}

{editingTask &&(

<div className="modal">

<div className="modal-content">

<h2>Edit Task</h2>

<input
value={editingTask.title}
onChange={(e)=>setEditingTask({
...editingTask,
title:e.target.value
})}
/>

<input
value={editingTask.description}
onChange={(e)=>setEditingTask({
...editingTask,
description:e.target.value
})}
/>

<select
value={editingTask.priority}
onChange={(e)=>setEditingTask({
...editingTask,
priority:e.target.value
})}
>

<option value="low">Low</option>
<option value="medium">Medium</option>
<option value="high">High</option>

</select>

<input
type="date"
value={editingTask.dueDate?.slice(0,10)}
onChange={(e)=>setEditingTask({
...editingTask,
dueDate:e.target.value
})}
/>

<div className="modal-actions">

<button onClick={updateTask}>
Save
</button>

<button
onClick={()=>setEditingTask(null)}
>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

</div>

);

}