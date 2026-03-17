import { useState } from "react";
import api from "../../../api/api";
import "./CreatePet.css";

export default function CreatePet({ onCreated }) {

  const [name,setName] = useState("");
  const [type,setType] = useState("cat");

  const createPet = async ()=>{

    if(!name.trim()) return;

    await api.post("/pet/create",{
      type,
      name
    });

    onCreated();

  };

  return (

    <div className="create-pet-page">

      <div className="create-pet">

        <h1>Create your first pet 🐾</h1>

        {/* PET SELECT */}

        <div className="pet-types">

          <div
            className={`pet-card ${type==="cat"?"active":""}`}
            onClick={()=>setType("cat")}
          >
            <img src="/pets/cat/baby.png" alt="cat"/>
            <p>Cat</p>
          </div>

          <div
            className={`pet-card ${type==="dog"?"active":""}`}
            onClick={()=>setType("dog")}
          >
            <img src="/pets/dog/baby.png" alt="dog"/>
            <p>Dog</p>
          </div>

          <div
            className={`pet-card ${type==="duck"?"active":""}`}
            onClick={()=>setType("duck")}
          >
            <img src="/pets/duck/baby.png" alt="duck"/>
            <p>Duck</p>
          </div>

        </div>

        {/* PREVIEW */}

        <div className="pet-preview">

          <img
            src={`/pets/${type}/baby.png`}
            alt="preview"
          />

        </div>

        {/* NAME INPUT */}

        <input
          placeholder="Pet name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <button onClick={createPet}>
          Create Pet
        </button>

      </div>

    </div>

  );

}