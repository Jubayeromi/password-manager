import { useCallback, useEffect, useRef, useState, type ChangeEvent } from "react"
import Table from "./Table.tsx"
import { dataSubmit } from "../routes/dataSubmit.ts"
import { apiUrl } from "../routes/api.ts"
import { useAuth } from "../context/useAuth.ts";




const Manager = () => {
  const { user } = useAuth();

  const [eye, setEye] = useState(true)

  const [form, setform] = useState({ site: "", userName: "", password: "" })
  const [entries, setEntries] = useState<{ id: string; site: string; userName: string }[]>([])

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  const getData = useCallback(async () => {
    if (!user) return []
    const api = await fetch(apiUrl("/saved"), {
      credentials: "include"
    })
    if (!api.ok) {
      throw new Error(`could not load sved items ${api.status}`)
    }

    const Data = await api.json()
    return Data.data.map(
      (entry: {
        _id: string;
        site: string;
        userName: string;
      }) => ({
        id: entry._id,
        site: entry.site,
        userName: entry.userName,
      }),
    )
  }, [user])

  useEffect(() => {
    if (!user) return

    let isCurrent = true
    void getData()
      .then((data) => {
        if (isCurrent) setEntries(data)
      })
      .catch((err) => {
        console.error(err, "something went wrong")
      })

    return () => {
      isCurrent = false
    }
  }, [getData, user])


  const handleSubmit = async () => {
    if (!form.site.trim() || !form.userName.trim() || !form.password.trim()) return

    await dataSubmit(form)
    setform({ site: "", userName: "", password: "" })
  }



  const handleDelete = async (id: string) => {
    const res = await fetch(apiUrl(`/saved/${id}`), {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.data || "Could not delete password");
    }

    setEntries((current) => current.filter((entry) => entry.id !== id));
  }


  return (
    <div className="relative isolate min-h-screen">
      <div className="absolute inset-0 -z-10 bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-full w-77.5 rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className="flex flex-col items-center w-full md:pt-20">
        <div className="text-center">

          <h1 className="font-bold text-2xl">
            <span className="text-green-500">&lt;</span>
            <span>

              Pass
            </span>
            <span className="text-green-500">OP/&gt;</span>
          </h1>
          <p className="text-lg ">Password Manager </p>
        </div>
        <div className="text-black flex flex-col p-4 gap-5 w-full items-center">

          <input onChange={handleChange} value={form.site} className="border-2 md:w-[65%] h-10 w-full p-0.5 px-3 font-bold text-lg border-green-600 rounded-2xl" type="text" name="site" placeholder="Enter website's Name" />
          <div className="md:flex md:gap-5 md:w-[65%] w-full justify-between ">
            <div className="md:flex md:gap-5 md:w-[65%] ">

              <div className="flex md:gap-5 items-center">

                <input onChange={handleChange} value={form.userName} className="h-10 border-2 max-w-[55%] min-w-[10%] p-0.5 px-3 font-bold text-lg border-green-600 rounded-2xl" type="text" name="userName" placeholder="Enter Username" />
                <div className=" max-w-[65%] min-w-[10%] relative">

                  <input value={form.password} onChange={handleChange} className="h-10 w-full border-2 p-0.5 px-3 font-bold text-lg border-green-600 rounded-2xl" type={eye ? "text" : "password"} name="password" placeholder="Enter Password" />
                  <span onClick={() => {
                    setEye(!eye)

                  }} className="absolute right-3 top-2 cursor-pointer">
                    <img src={eye ? "/openEye.svg" : "/closeEye.svg"} alt="" />

                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={async () => {
                if (!user) {
                  alert("please log in")
                }
                if (user && form.site.trim() !== '' && form.userName.trim() !== '' && form.password.trim() !== '') {
                  try {

                    await handleSubmit()
                    videoRef.current?.play()
                    setEntries(await getData())
                  } catch (err) {
                    console.error(err, "something went wrong")
                  }
                }
              }}
              className="border flex justify-self-center mt-5 border-green-700 md:text-lg text-sm items-center justify-center active:scale-95 gap-2 px-3 cursor-pointer py-2 font-semibold rounded-full bg-green-500 "><video ref={videoRef} className="md:h-10 md:w-10 w-5 h-5 bg-green-400 cursor-pointer active:scale-95 rounded-full" src="/doodle-color-49-plus-circle-hover-pinch.mp4"></video> Add Password</button>
          </div>
        </div>
      </div>
      <Table
        key={user ? "authenticated" : "anonymous"}
        entries={user ? entries : []}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Manager
