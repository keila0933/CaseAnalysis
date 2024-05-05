import axios from "axios";

export const apiUrl =
  "https://svc-dashboard-dummy-api-7ej42xs2pa-de.a.run.app/api/get-data";

const axiosConfig = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0X3VzZXIxIiwiZXhwIjoxNzE2NjIzODY0fQ.N7ZLHiwARPLjDsPE1jCbSeUs2O03kFI36B6l9rQNMTs",
    "Content-Type": "application/json",
  },
};

export const getCasesData = async (payload) => {
  try {
    const response = await axios.post(apiUrl, payload, axiosConfig);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
