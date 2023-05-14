import { BASE_URL } from "../lib/config";
import { fetcher } from "../lib/fetcher";

export default async function getFavoriteByUserId(userId, recipeStore) {
  const recipeIds = [];
  const BE_URL = `${BASE_URL}/favorites/${userId}`;
  const response = await fetcher(BE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  for (let i = 0; i < response.length; i++) {
    recipeIds.push(+response[i].recipeId);
  }
  const data = recipeStore.filter((recipe) =>
    recipeIds.includes(recipe.recipeId)
  );
  return { data, response };
}

export async function deleteFavoriteById(favoriteId) {
  const BE_URL = `${BASE_URL}/favorites/${favoriteId}`;
  console.log("BE_URL: ", BE_URL);
  const response = await fetcher(BE_URL, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function createFavorite(userId, recipeId) {
  const BE_URL = `${BASE_URL}/favorites`;
  console.log("BE_URL: ", BE_URL);
  const response = await fetcher(BE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, recipeId }),
  });
  return response;
}
