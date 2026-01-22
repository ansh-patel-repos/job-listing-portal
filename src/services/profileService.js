const API_URL = "http://localhost:5000/api/profile";

// Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// GET PROFILE (fetch existing profile)
export const getProfile = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

// UPDATE PROFILE (save changes)
export const updateProfile = async (profileData) => {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};
