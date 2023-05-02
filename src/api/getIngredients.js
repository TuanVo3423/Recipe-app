import { BASE_URL } from "../lib/config";
import { fetcher } from "../lib/fetcher";

export default async function getIngredients() {
  const response = await fetcher(`${BASE_URL}/ingredients`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
}
