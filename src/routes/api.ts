const backendUrl = import.meta.env.PROD
  ? ""
  : import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "") ||
    "http://localhost:3000";

export const apiUrl = (path: string) =>
  `${backendUrl}/${path.replace(/^\/+/, "")}`;
