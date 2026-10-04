import { useRef, useState, type ChangeEvent } from "react"

const Manager = () => {

  const [eye, setEye] = useState(true)

  const [form, setform] = useState({site:"", userName:"",password:""})

  const videoRef=useRef<HTMLVideoElement| null> (null)

const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
  setform({...form,[e.target.name]:e.target.value})
}

const handleSubmit= ()=>{
console.log(form)
}


  return (
    <div >
      <div className="absolute inset-0 -z-10 bg-green-100 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
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

          <input onChange={handleChange} value={form.site} className="border-2 md:w-[65%] w-full p-0.5 px-3 font-bold text-lg border-green-600 rounded-2xl" type="text" name="site" placeholder="Enter website's Name" />
          <div className="flex gap-5 md:w-[65%] w-full justify-between ">
            <input onChange={handleChange} value={form.userName} className="h-10 border-2 max-w-[35%] min-w-[10%] p-0.5 px-3 font-bold text-lg border-green-600 rounded-2xl" type="text" name="userName" placeholder="Enter Username" />
            <div className=" max-w-[35%] min-w-[10%] relative">

            <input value={form.password} onChange={handleChange} className="h-10 border-2 pr-10 p-0.5 px-3 font-bold text-lg border-green-600 rounded-2xl" type={eye?"text":"password"} name="password" placeholder="Enter Password" />
            <span onClick={()=>{
              setEye(!eye)
             
            }} className="absolute right-2 top-2 cursor-pointer">
             <img src={eye?"/openEye.svg":"/closeEye.svg" }alt="" />  
             
              </span>
            </div>
            <button 
            onClick={()=>{
              handleSubmit()
videoRef.current?.play()
            }}
            className="border border-green-700 md:text-lg text-sm items-center justify-center active:scale-95 gap-2 px-3 cursor-pointer py-2 font-semibold rounded-full bg-green-500 flex"><video ref={videoRef}  className="md:h-10 md:w-10 w-5 h-5 bg-green-400 cursor-pointer active:scale-95 rounded-full" src="/doodle-color-49-plus-circle-hover-pinch.mp4"></video> Add Password</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Manager
