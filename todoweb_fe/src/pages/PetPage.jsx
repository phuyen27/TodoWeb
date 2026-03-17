import React, { useEffect, useState } from "react";
import api from "../api/api";

import CreatePet from "../components/Pet/CreatePet/CreatePet";
import PetDashboard from "../components/Pet/PetDashboard/PetDashboard";
import { Sidebar } from "../components/Sidebar/Sidebar";
import "./PetPage.css";

export default function PetPage() {

  const [pet,setPet] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    loadPet();

  },[]);

  const loadPet = async ()=>{

    try{

      const res = await api.get("/pet");

      setPet(res.data);

    }catch(err){

      console.error(err);

    }

    setLoading(false);

  };

  if(loading){
    return <div className="pet-loading">Loading pet...</div>
  }

  return (

    <div className="pet-page">

      {pet
        ? <PetDashboard pet={pet}/>
        : <CreatePet onCreated={loadPet}/>
      }

    </div>

  );

}