
type PasswordEntry = {
  id: string
  site: string
  userName: string
  password: string
}

type TableProps = {
  entries: PasswordEntry[]
}

const Table = ({ entries }: TableProps) => {

  
  

  return (
    <div className="max-w-5xl w-full overflow-x-auto flex justify-self-center flex-col">
      <h1 className="ml-2 font-bold text-2xl">Your Passwords</h1>
    <div className="mx-auto mt-6 w-full rounded-2xl border border-green-200 bg-white shadow-sm">
      <table className="w-full md:min-w-150 min-w-fit table-auto text-left rounded-t-2xl overflow-hidden">
        <thead className="bg-green-800 text-green-100 ">
          <tr className="flex justify-between md:mx-5 ">
            <th className="px-5 md:w-[27%] py-4 font-semibold">Website</th>
            <th className="px-5 md:w-[37%] py-4 font-semibold">Username</th>
            <th className="px-5 md:w-[24%] py-4 font-semibold">Password</th>
            <th className="px-5 md:w-[10%] py-4 font-semibold">Edit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-100">
          {entries.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-5 py-8 text-center text-green-800/70">
                No passwords saved yet.
              </td>
            </tr>
          ) : (
            entries.map(({ id, site, userName, password }) => (
              <tr key={id} className="odd:bg-green-50 md:px-5 flex justify-between even:bg-green-50/60">
                <td className="px-5 py-4 md:w-[27%] font-bold text-green-950">{site}</td>
                <td className="px-5 py-4 md:w-[37%] font-semibold text-green-900">{userName}</td>
                <td className="px-5 py-4 md:w-[24%] font-semibold text-green-900">{password}</td>
                <td className="px-5 py-4 md:w-[10%] font-semibold text-green-900">edit</td>
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
