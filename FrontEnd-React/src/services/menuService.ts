import axios from "axios";

const API_URL =
  "https://creativewebgraphic.com/nrccwordpress/wp-json/menus/v1/menus";

export const getHeaderMenu = async () => {
  try {
    const response = await axios.get(`${API_URL}/header`);

    return response.data;
  } catch (error) {
    console.error("Menu API Error:", error);
    return null;
  }
};