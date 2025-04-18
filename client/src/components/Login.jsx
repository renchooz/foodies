import React from "react";
import { useAppContext } from "../context/AppContext";
const Login = () => {
    let {setshowUserLogin,setUser,User} = useAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    let SubmitHandler = (e)=>{
        e.preventDefault()
        setUser({
            email:"rjsharma.rs",
            pass:"jdjd"
        })
        setshowUserLogin(false)
       
    }
console.log(User)

    return (
       <div onClick={()=>setshowUserLogin(false)} className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-30 bg-black/50 h-full"
       > <form onSubmit={SubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
       <p className="text-2xl font-medium m-auto">
           <span className="text-[#E9AB54]">User</span> {state === "login" ? "Login" : "Sign Up"}
       </p>
       {state === "register" && (
           <div className="w-full">
               <p>Name</p>
               <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#E9AB54]" type="text" required />
           </div>
       )}
       <div className="w-full ">
           <p>Email</p>
           <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#E9AB54]" type="email" required />
       </div>
       <div className="w-full ">
           <p>Password</p>
           <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#E9AB54]" type="password" required />
       </div>
       {state === "register" ? (
           <p>
               Already have account? <span onClick={() => setState("login")} className="text-[#E9AB54] cursor-pointer">click here</span>
           </p>
       ) : (
           <p>
               Create an account? <span onClick={() => setState("register")} className="text-[#E9AB54] cursor-pointer">click here</span>
           </p>
       )}
       <button  className="bg-[#E9AB54] hover:bg-[#926526] transition-all text-white w-full py-2 rounded-md cursor-pointer">
           {state === "register" ? "Create Account" : "Login"}
       </button>
   </form></div>
    );
};
export default Login