const backendUrl =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "") ||
  (import.meta.env.PROD ? "" : "http://localhost:3000");

export const apiUrl = (path: string) =>
  `${backendUrl}/${path.replace(/^\/+/, "")}`;
