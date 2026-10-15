import { apiUrl } from "./api.ts";

type PasswordForm = {
  site: string;
  userName: string;
  password: string;
};

export const dataSubmit = async (form: PasswordForm) => {
    const api = await fetch(apiUrl("/save"), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const response = await api.json();

    if (!api.ok) {
      throw new Error(response.data ?? `Could not save password (${api.status})`);
    }
}