import { BASE_URL } from "../lib/config";
import { fetcher } from "../lib/fetcher";

export default async function getCategories() {
  const BE_URL = `${BASE_URL}/categories`;
  const response = await fetcher(BE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function getCategoryById(categoryId) {
  const BE_URL = `${BASE_URL}/categories/${categoryId}`;
  const response = await fetcher(BE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
