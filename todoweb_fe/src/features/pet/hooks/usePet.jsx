import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getPet, createPet, chatWithPet } from "../services/petService";

export default function usePet() {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const loadPet = async () => {
    try {
      const data = await getPet();
      setPet(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pet 🐾");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePet = async (payload) => {
    const toastId = toast.loading("Creating your pet... 🐣");

    try {
      await createPet(payload);
      await loadPet();

      toast.success("Pet created! 🎉", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create pet", { id: toastId });
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const reply = await chatWithPet(text);

      const petMsg = { role: "pet", text: reply };
      setMessages((prev) => [...prev, petMsg]);

    } catch (err) {
      console.error("Chat error:", err);

      toast.error("Pet is sleeping... 😴");

      // optional: show fallback message
      setMessages((prev) => [
        ...prev,
        { role: "pet", text: "..." }
      ]);
    }
  };

  useEffect(() => {
    loadPet();
  }, []);

  return {
    pet,
    loading,
    createPet: handleCreatePet,
    messages,
    sendMessage,
    refreshPet: loadPet
  };
}