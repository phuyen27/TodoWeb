import CreatePet from "./components/CreatePet";
import PetDashboard from "./components/PetDashboard";
import usePet from "./hooks/usePet";
import "./PetPage.css";


export default function PetPage() {
  const { pet, loading, createPet, sendMessage, messages } = usePet();
 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pet-page">
      {pet ? (
        <PetDashboard
          pet={pet}
          messages={messages}
          onSend={sendMessage}
         
        />
      ) : (
        <CreatePet onCreated={createPet} />
      )}
    </div>
  );
}