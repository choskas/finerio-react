import axios from "axios";
const BASE_URL = "https://api.finerio.mx/api";
export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    sessionStorage.setItem('TOKEN', response.data.access_token)
  } catch (error) {
    throw error
  }
};

export const userData = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    console.log(error)
  }
};

export const userMovements = async (token: string, id: string, counterShow: number = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${id}/movements?deep=true&offset=0&max=${counterShow}&includeCharges=true&includeDeposits=true&includeDuplicates=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data
  } catch (error) {
    console.log(error)
  }
};
