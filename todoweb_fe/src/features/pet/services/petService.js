import api from "../../../api/api";

export const getPet = async () => {
  const res = await api.get("/pet");
  return res.data;
};


export const createPet = async (data) => {
  const res = await api.post("/pet/create", data);
  return res.data;
};

export const chatWithPet = async (message) => {
  const res = await api.post("/pet/chat", {
     message });
  return res.data;
}