import { Sidebar } from "../../../components/Sidebar/Sidebar";
import PetChat from "./PetChat";
import room from "../../../assets/images/room-pet.png";
import { useEffect, useState } from "react";
import {useAuth} from "../../../hooks/useAuth";
export default function PetDashboard({ pet, messages, onSend }) {

  const [timeClass, setTimeClass] = useState("");
  const { logout } = useAuth();
    useEffect(() => {
      const updateTime = () => {
      const hour = new Date().getHours();
       
        if (hour >= 5 && hour < 10) setTimeClass("morning");
        else if (hour < 17) setTimeClass("day");
        else if (hour < 19) setTimeClass("sunset");
        else setTimeClass("night");
      };

      updateTime();
      const interval = setInterval(updateTime, 60000);

      return () => clearInterval(interval);
    }, []);


    const [sunPosition, setSunPosition] = useState({ x: 60, y: 30 });

    useEffect(() => {
      const updateSun = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        const t = hour + minute / 60;

      
        const progress = Math.min(Math.max((t - 5) / 14, 0), 1);

        
        const x = 20 + progress * 60; // %
        const y = 20 + Math.sin(progress * Math.PI) * 30;

        setSunPosition({ x, y });
      };

      updateSun();
      const interval = setInterval(updateSun, 60000);

      return () => clearInterval(interval);
    }, []);

    const [lightOn, setLightOn] = useState(false);
    

  return (
    <div className={`pet-dashboard-page ${timeClass}`}>
      <div className="pet-layout">
        <Sidebar onLogout={logout} />

        <div className="pet-dashboard">
          <div className="pet-container flex-wrap">

            {/* LEFT: PET */}
            <div className="pet-left">

              <div className="pet-card">
               <h2 className="text-2xl font-extrabold text-primary-700 tracking-widest p-3
               drop-shadow-[2px_2px_0_rgba(0,0,0,0.7)]">
                {pet.name}
              </h2>

              {timeClass === "night" && (
                  <button
                    className="light-toggle"
                    onClick={() => setLightOn(!lightOn)}
                  >
                    {lightOn ? "💡 ON" : "🌑 OFF"}
                  </button>
                )}
                              <div
                  className={`pet-img-wrapper ${lightOn ? "light-on" : ""}`}
                  style={{
                    "--sun-x": `${sunPosition.x}%`,
                    "--sun-y": `${sunPosition.y}%`,
                    backgroundImage: `url(${room})`
                  }}
                >

                  
                  <div className="particles">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span key={i}></span>
                    ))}
                  </div>

                  
                  <div className="window-light"></div>

                 
                  <img
                    className="pet-image"
                    src={`/pets/${pet.type}/${pet.stage}.png`}
                    alt="pet"
                  />
                </div>
               
              </div>

            </div>

            {/* RIGHT: CHAT */}
            <div className="pet-right">
              <div className="chat-card">
                <PetChat
                  messages={messages}
                  onSend={onSend}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}