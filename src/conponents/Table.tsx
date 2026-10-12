import { useState } from "react"

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

  const [eye, seteye] = useState(true)
  const copyText= (password:string)=>{
 navigator.clipboard.writeText(password)
  }
  

  return (
    <div className="max-w-5xl w-full overflow-x-auto flex justify-self-center flex-col">
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
              <td colSpan={3} className="px-5 py-8 text-center text-green-800/70">
                No passwords saved yet.
              </td>
            </tr>
          ) : (
            entries.map(({ id, site, userName, password }) => (
              <tr key={id} className="odd:bg-green-50 md:px-5 flex even:bg-green-50/60">
                <td className="px-5 py-4 md:w-[27%] font-bold text-green-950">{site}</td>
                <td className="px-5 py-4 md:w-[37%] font-semibold text-green-900">{userName}</td>
                <td className="px-5 flex justify-between py-4 md:pr-5 md:w-[24%] font-semibold text-green-900">{password} <span className="flex md:gap-5">
                  <img onClick={()=>{copyText(password)}} className="cursor-pointer active:scale-95" src="/copy.svg" alt="Copy" /> 
                {eye?  <img onClick={()=>{
seteye(!eye)
                }  } className="cursor-pointer active:scale-95" src="/closeEye.svg" alt="close" /> :  <img onClick={()=>{
seteye(!eye)
                } } className="cursor-pointer active:scale-95" src="/openEye.svg" alt="open" />  }
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
