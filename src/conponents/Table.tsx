import { useState } from "react"
import { apiUrl } from "../routes/api.ts"

type PasswordEntry = {
  id: string
  site: string
  userName: string
}

type TableProps = {
  entries: PasswordEntry[]
}

const Table = ({ entries }: TableProps) => {
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const copyText = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
    } catch (err) {
      console.error(err, "Could not copy password");
    }
  }

  const togglePassword = async (id: string) => {
    if (Object.hasOwn(revealedPasswords, id)) {
      setRevealedPasswords((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      return;
    }

    setLoadingId(id)

    try {
      const res = await fetch(apiUrl(`/saved/${id}/show-password`), {
        method: "POST",
        credentials: "include"
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.data || "could not reveal password")
      }

      setRevealedPasswords((current) => ({
        ...current,
        [id]: data.data.password,
      }));
    } catch (err) {
      console.error(err, "something went wrong")
    } finally {
      setLoadingId(null)
    }
  }


  return (
    <div className="max-w-5xl w-full flex justify-self-center flex-col">
      <h1 className="ml-2 font-bold text-2xl">Your Passwords</h1>
      <div className="mx-auto mt-6 w-full rounded-2xl border border-green-200 bg-white shadow-sm">
        <table className="w-full md:min-w-150 min-w-fit table-auto text-left rounded-t-2xl overflow-hidden">
          <thead className="bg-green-800 text-green-100 ">
            <tr className="flex md:mx-5 ">
              <th className="px-5 md:w-[27%] py-4 font-semibold">Website</th>
              <th className="px-5 md:w-[37%] py-4 font-semibold">Username</th>
              <th className="px-5 md:w-[24%] py-4 font-semibold">Password</th>
              <th className="px-5 md:w-[10%] py-4 font-semibold flex justify-end">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-green-800/70">
                  No passwords saved yet.
                </td>
              </tr>
            ) : (
              entries.map(({ id, site, userName }) => (
                <tr key={id} className="odd:bg-green-50 md:px-5 flex even:bg-green-50/60">
                  <td className="px-5 py-4 md:w-[30%] overflow-hidden font-bold text-green-950">{site}</td>
                  <td className="px-5 py-4 md:w-[35%] font-semibold overflow-hidden text-green-900">{userName}</td>
                  <td className="px-5 flex justify-between overflow-hidden py-4 md:pr-5 md:w-[24%] font-semibold text-green-900">
                    <span>{revealedPasswords[id] ?? "••••••••"}</span>
                    <span className="flex md:gap-5">
                      <button
                        type="button"
                        onClick={() => void copyText(revealedPasswords[id])}
                        disabled={revealedPasswords[id] === undefined}
                        className="disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Copy password"
                        title={revealedPasswords[id] === undefined ? "Reveal the password before copying" : "Copy password"}
                      >
                        <img className="cursor-pointer active:scale-95" src="/copy.svg" alt="" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void togglePassword(id)}
                        disabled={loadingId === id}
                        aria-label={revealedPasswords[id] === undefined ? "Show password" : "Hide password"}
                        title={revealedPasswords[id] === undefined ? "Show password" : "Hide password"}
                      >
                        <img
                          className="cursor-pointer active:scale-95"
                          src={revealedPasswords[id] === undefined ? "/closeEye.svg" : "/openEye.svg"}
                          alt=""
                        />
                      </button>
                    </span>
                  </td>
                  <td className="px-5 flex justify-end py-4 md:w-[10%] font-semibold text-green-900">edit</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
