import { ChangeEvent, useState } from "react"
import { data, Link,useNavigate } from "react-router-dom"
import { SignUpInput,SignInInput } from "@rehneet-singh/blogger-common"
import axios from "axios"
import { BACKENDURL } from "../config"

function Auth({type}:{type:"signup"|"signin"}) {
  
  const navigate=useNavigate(); 
  const [postInputs,setPostInputs]=useState<SignUpInput>({
    name:"",
    email:"",
    password:""
  })
  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKENDURL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs)
      const jwt=response.data.jwt;
      console.log(jwt)
      console.log(postInputs)
      localStorage.setItem("token",jwt)
      navigate("/blogs")
    }
    catch(e){
      alert("Error while Signing Up")
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col bg-black ">
        <div className="flex justify-center">
          <div className="border border-cyan-200 p-10 rounded-xl">
          <div className="px-10">
              <div className="text-3xl font-bold text-cyan-200 ">
                  Create an account
              </div>
              <div className="text-sm text-center text-cyan-50">
                {type==="signin"?"Don't have an account?":"Already have an account?"}
                <Link to={type==="signin"? '/signup':'/signin'} className="pl-2 underline">{type==="signin"?"Create Account":"Login"}</Link>
              </div>
            </div>
            <div className="mt-4">
              {type==="signup" ?<LabelledInput label="Name" placeholder="Your Name" onChange={(e)=>{
                setPostInputs({...postInputs, name:e.target.value})
              }}/>:null}
              <LabelledInput label="Email" placeholder="Your Email" onChange={(e)=>{
                setPostInputs({...postInputs, email:e.target.value})
              }}/>
              <LabelledInput label="Password"  type={"password"} placeholder="Your Password" onChange={(e)=>{
                setPostInputs({...postInputs, password:e.target.value})
              }}/>
              <button type="button" onClick={sendRequest} className="text-black bg-white border  focus:outline-none hover:bg-cyan-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 mt-10 w-full ">{type=="signup"?"Sign up":"Sign in"}</button>
            </div>
            
        </div>
      </div>       
    </div>
  )
}

interface LabelInput{
  label:string
  placeholder:string
  onChange:(e:ChangeEvent<HTMLInputElement>)=> void
  type?:string
  

}
function LabelledInput({label,placeholder,onChange,type}:LabelInput){
  return <div className="pt-2">
    <label  className="block mb-2 text-sm font-semibold text-white pt-3">{label}</label>
    <input  onChange={onChange} type={type || "text" } className=" border bg-black border-cyan-300 text-white text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2 " placeholder={placeholder} required />
  </div>
}

export default Auth