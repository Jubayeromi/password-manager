
import { useState, type ChangeEvent } from "react"
import { loginAuth } from "../routes/login.ts"
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  
  const [showSignin, setshowSignin] = useState(false)
  const [showLogin, setshowLogin] = useState(false)
  const [login, setLogin] = useState({ email: "", password: "" })
  const [eye, seteye] = useState(true)
  const [emailError, setEmailError] = useState(false)
  
  const { user, loading, logIn, logout } = useAuth();
   if (loading) return null; 

  const handleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
    if (e.target.name === "email") setEmailError(false)

  }


  const loginSubmit = async () => {
    const isValidGmail = login.email.trim().toLowerCase().endsWith("@gmail.com")
    setEmailError(!isValidGmail)
    try {
      if (login.email.trim().endsWith("@gmail.com") && login.password.trim().length >= 8) {
        const url = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(login)
        })
        const response = await url.json()
        console.log(response)
        if (url.status === 201) {
          setshowLogin(false)
          setLogin({ email: "", password: "" })
          setEmailError(false)
        }
      } else {
        alert("pls write a valid email and password should be atleast 8 cherecter")
      }
    } catch (err) {
      console.error(err, "someting in the frontend")
    }

  }
  return (
    <nav>
      <div className="bg-green-950 flex justify-between p-3 px-20 md:p-5 md:px-30 w-full">

        <div className=" font-bold text-white text-2xl">

          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">OP/ &gt;</span>
        </div>


        <div className="flex gap-3">
          <button onClick={() => setshowSignin(true)} className="bg-green-400 px-5 py-2 rounded-3xl text-lg text-green-950 font-bold transition-colors hover:bg-green-300 cursor-pointer active:scale-95">Sign Up</button>

          <button onClick={() => setshowLogin(true)} className="bg-green-400 px-5 py-2 rounded-3xl text-lg text-green-950 font-bold transition-colors hover:bg-green-300 cursor-pointer active:scale-95">Log In</button>

        </div>
      </div>


      {showSignin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"

        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="w-full max-w-sm rounded-xl bg-green-100 p-6 shadow-xl"
          // onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">

              <h2 id="login-title" className="mb-4 text-xl font-bold">
                Sign Up
              </h2>
              <span onClick={() => setshowSignin(false)} className="w-10 h-10 cursor-pointer active:scale-95 mb-2 bg-gray-500 rounded-md justify-center items-center flex"><img src="/cross.svg" alt="" /></span>
            </div>

            <input onChange={handleLogin} value={login.email} className={`${emailError ? "" : "mb-3"} w-full rounded border p-2`} type="email" placeholder="Email" name="email" />
            {emailError && (
              <p role="alert" className="mb-3 mt-1 text-sm text-red-700">
                Enter a valid Gmail address.
              </p>
            )}
            <div className="w-full relative">

              <input onChange={handleLogin} value={login.password} className="mb-4 w-full rounded border p-2" type={eye ? "password" : "text"} placeholder="Password" name="password"
              />
              <span onClick={() => {
                seteye(!eye)

              }} className="absolute right-2 top-2 cursor-pointer">
                <img src={eye ? "/closeEye.svg" : "/openEye.svg"} alt="" />

              </span>
            </div>

            <button onClick={loginSubmit} className="w-full cursor-pointer active:scale-95 rounded bg-green-700 p-2 font-bold text-white">
              Sign Up
            </button>

          </section>
        </div>
      )}

      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"

        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
            className="w-full max-w-sm rounded-xl bg-green-100 p-6 shadow-xl"
          // onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">

              <h2 id="login-title" className="mb-4 text-xl font-bold">
                Log In
              </h2>
              <span onClick={() => setshowLogin(false)} className="w-10 h-10 cursor-pointer active:scale-95 mb-2 bg-gray-500 rounded-md justify-center items-center flex"><img src="/cross.svg" alt="" /></span>
            </div>

            <input onChange={handleLogin} value={login.email} className={`${emailError ? "" : "mb-3"} w-full rounded border p-2`} type="email" placeholder="Email" name="email" />
            {emailError && (
              <p role="alert" className="mb-3 mt-1 text-sm text-red-700">
                Enter a valid Gmail address.
              </p>
            )}
            <div className="w-full relative">

              <input onChange={handleLogin} value={login.password} className="mb-4 w-full rounded border p-2" type={eye ? "password" : "text"} placeholder="Password" name="password"
              />
              <span onClick={() => {
                seteye(!eye)

              }} className="absolute right-2 top-2 cursor-pointer">
                <img src={eye ? "/closeEye.svg" : "/openEye.svg"} alt="" />

              </span>
            </div>

            <button onClick={() => {
              loginAuth([login, setLogin], setshowLogin)
            }} className="w-full cursor-pointer active:scale-95 rounded bg-green-700 p-2 font-bold text-white">
              Log In
            </button>

          </section>
        </div>
      )}
    </nav>
  )
}

export default Navbar
