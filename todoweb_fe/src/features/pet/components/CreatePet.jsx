import { useState } from "react";

export default function CreatePet({ onCreated }) {
    const [name,setName] = useState("");
    const [type,setType] = useState("cat");

    const handleCreate = () => {
        if(!name.trim()) return;
        onCreated({
            name,
            type
        });
    };

     return (
    <div className="cp-page">
  <div className="cp-container">
    <h1>Create your first pet 🐾</h1>

    <div className="cp-types">
      {["cat", "dog", "duck"].map((t) => (
        <div
          key={t}
          className={`cp-card ${type === t ? "active" : ""}`}
          onClick={() => setType(t)}
        >
          <img src={`/pets/${t}/baby.png`} alt={t} />
          <p>{t}</p>
        </div>
      ))}
    </div>

    <div className="cp-preview">
      <img src={`/pets/${type}/baby.png`} alt="preview" />
    </div>

    <input
      className="cp-input"
      placeholder="Pet name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <button className="cp-btn" onClick={handleCreate}>
      Create Pet
    </button>
  </div>
</div>
  );
}