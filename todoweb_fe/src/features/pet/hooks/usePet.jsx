import { useEffect, useState } from "react";
import {getPet, createPet, chatWithPet} from "../services/petService";
export default function usePet(){

    const [pet,setPet] = useState(null);
    const [loading,setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

   const loadPet = async () => {
    try {
        const data = await getPet();
        console.log("API pet:", data);
        setPet(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};
    const handleCreatePet = async (payload)=>{
        await createPet(payload);
        await loadPet();
    };

    const sendMessage = async (text) =>{
        if(!text.trim()) return;

        const userMsg = {role: "user", text};
        setMessages((prev)=>([...prev, userMsg]));

        try{
            const reply = await chatWithPet(text);
            const petMsg = {role: "pet", text: reply};
            setMessages((prev)=>([...prev, petMsg]));
        }catch(err){
            console.error("Chat error:", err);
        }
    }

   useEffect(() => {
    loadPet();
}, []);

    return {
        pet,
        loading,
        createPet: handleCreatePet,
        messages,
        sendMessage,
        refreshPet: loadPet,
        handleCreatePet
    };  
}