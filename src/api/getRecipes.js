import { BE_URL } from "../lib/config";
import { fetcher } from "../lib/fetcher";

const API_URL = `http://192.168.1.3:5000/recipes`;

export default async function getRecipes() {
  const response = await fetcher("http://192.168.1.3:5000/recipes", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function getRecipeByIngerdientId(ingredientId) {
  const response = await fetcher(`${API_URL}/ingredient/${ingredientId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
}
