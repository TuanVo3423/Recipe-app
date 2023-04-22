export const fetcher = (input, init) =>
  fetch(input, {
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  }).then((res) => res.json());
