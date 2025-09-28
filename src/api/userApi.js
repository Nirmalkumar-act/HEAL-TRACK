// src/api/userApi.js
import api from "./api"; // ✅ default import

export const fetchUsers = async () => {
  try {
    const response = await api.get("/users"); // endpoint on your backend
    return response.data;
  } catch (err) {
    console.error("API error:", err);
    return [];
  }
};
