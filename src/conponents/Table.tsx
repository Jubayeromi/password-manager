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
    <div className="w-full max-w-5xl flex flex-col justify-self-center">
      <h1 className="ml-2 font-bold text-2xl">Your Passwords</h1>
      <div className="mx-auto mt-6 w-full rounded-2xl border border-green-200 bg-white shadow-sm">
        <table className="w-full table-fixed text-left rounded-t-2xl overflow-hidden">
          <thead className="bg-green-800 text-green-100 ">
            <tr>
              <th className="w-[33%] px-1 py-3 text-sm md:text-xl md:py-4 font-semibold md:px-5">Website</th>
              <th className="w-[32%] px-1 py-3 text-sm md:text-xl md:py-4 font-semibold md:px-5">Username</th>
              <th className="w-[26%] px-1 py-3 text-sm md:text-xl md:py-4 font-semibold md:px-5">Password</th>
              <th className="w-[10%] px-1 py-3 text-sm md:text-xl md:py-4 text-right font-semibold md:px-5">Edit</th>
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
                <tr key={id} className="odd:bg-green-50 even:bg-green-50/60">
                  <td className="overflow-hidden px-1 text-sm md:text-lg  py-4 font-bold text-green-950 md:px-5">{site}</td>
                  <td className="wrap-words md:text-lg text-sm overflow-hidden px-2 py-4 font-semibold text-green-900 md:px-5">{userName}</td>
                  <td className="px-1 py-4 font-semibold text-green-900 md:px-5">
                    <div className="flex items-center justify-between gap-1">
                    <span className="min-w-0 break-all">{revealedPasswords[id] ?? "••••••••"}</span>
                    <span className="flex shrink-0 md:gap-5">
                      <button
                        type="button"
                        onClick={() => void copyText(revealedPasswords[id])}
                        disabled={revealedPasswords[id] === undefined}
                        className="disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Copy password"
                        title={revealedPasswords[id] === undefined ? "Reveal the password before copying" : "Copy password"}
                      >
                        <img className="cursor-pointer md:w-6 w-5 h-5 md:h-6 active:scale-95" src="/copy.svg" alt="" />
                      </button>
                      <button
                        type="button"
                        onClick={() => void togglePassword(id)}
                        disabled={loadingId === id}
                        aria-label={revealedPasswords[id] === undefined ? "Show password" : "Hide password"}
                        title={revealedPasswords[id] === undefined ? "Show password" : "Hide password"}
                      >
                        <img
                          className="cursor-pointer md:w-6 w-5 h-5 md:h-6 active:scale-95"
                          src={revealedPasswords[id] === undefined ? "/closeEye.svg" : "/openEye.svg"}
                          alt=""
                        />
                      </button>
                    </span>
                    </div>
                  </td>
                  <td className="px-2 py-4 text-right font-semibold text-green-900 md:px-5">edit</td>
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
