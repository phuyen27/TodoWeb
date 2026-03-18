export default function TaskToolbar({ search, setSearch, filter, setFilter }) {
  return (
    <div className="toolbar">
      <input
        placeholder="Search..."
        value={search}
        onChange={e=>setSearch(e.target.value)}
      />

      <div className="filters">
        <button onClick={()=>setFilter("all")} className={filter==="all"?"active":""}>All</button>
        <button onClick={()=>setFilter("active")} className={filter==="active"?"active":""}>Active</button>
        <button onClick={()=>setFilter("completed")} className={filter==="completed"?"active":""}>Completed</button>
      </div>
    </div>
  );
}