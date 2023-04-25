import { BASE_URL } from "../lib/config";
import { fetcher } from "../lib/fetcher";

// const API_URL = `${BE_URL}`;

export async function login(username, password) {
  console.log(username, password);
  const data = await fetcher(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  return data;
}

export async function register(username, password, fullname, email) {
  console.log(username, password);
  const data = await fetcher(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      fullname,
      email,
    }),
  });

  return data;
}
