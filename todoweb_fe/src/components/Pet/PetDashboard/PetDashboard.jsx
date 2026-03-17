import "./PetDashboard.css";
import { Sidebar } from "../../Sidebar/Sidebar";

export default function PetDashboard({ pet }) {

  const moodEmoji = {
    happy: "😊",
    sad: "😢"
  };

  return (

    <div className="pet-dashboard-page">

      <div className="pet-layout">

        <Sidebar />

        <div className="pet-dashboard">

          <h1 className="pet-title">
            {pet.name}
          </h1>

          <div className="pet-card">

            <img
              className="pet-image"
              src={`/pets/${pet.type}/${pet.stage}.png`}
              alt="pet"
            />

            <div className="pet-info">

              <div className="pet-row">
                <span>Type</span>
                <b>{pet.type}</b>
              </div>

              <div className="pet-row">
                <span>Stage</span>
                <b>{pet.stage}</b>
              </div>

              <div className="pet-row">
                <span>Mood</span>
                <b>
                  {moodEmoji[pet.mood]} {pet.mood}
                </b>
              </div>

              <div className="pet-row">
                <span>Age</span>
                <b>{pet.ageDays} days</b>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}