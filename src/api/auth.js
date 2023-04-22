import { BE_URL } from "../lib/config";
import { fetcher } from "../lib/fetcher";

// const API_URL = `${BE_URL}`;

export async function login(username, password) {
  console.log(username, password);
  const data = await fetcher(`http://192.168.1.3:5000/auth/login`, {
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
  const data = await fetcher(`http://192.168.1.3:5000/auth/register`, {
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
