import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {

  const googleLogin = useGoogleLogin({
    onSuccess : (res) => {
      console.log(res)
      axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/google",{
        token : res.access_token
      }).then(
        (res)=>{
          if(res.data.message == "User created"){
            toast.success("Your account is created now you can login via google.")
          }else{
            localStorage.setItem("token",res.data.token)
            if(res.data.user.type == "admin"){
              window.location.href = "/admin"
            }else{
              window.location.href = "/"
            }
          }
        }
      )
    }
  })
  const [email, setEmail] = useState("Your email");
  const [password, setPassword] = useState("");
  

  function login(){
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
      email : email,
      password : password
    }).then((res)=>{

      if(res.data.user == null){
        toast.error(res.data.message)
        return
      }
      toast.success("Login successful")
      localStorage.setItem("token", res.data.token)
      if(res.data.user.type === "admin"){
        window.location.href = "/admin"
      }else{
        window.location.href = "/"
      }
    })
  }

  return (
    <div className=" w-full h-screen bg-primary flex justify-center items-center">
      <div className= "w-[450px] h-[450px] bg-blue-600 flex flex-col justify-center items-center" >

        <img src='/logo.jpg' className="rounded-full w-[100px]"/>

        <span>Email</span>
        <input type="text" defaultValue={email} onChange={(e)=>{

          setEmail(e.target.value)

        }}
        className="border border-black"
        />

        <span>Password</span>
        <input type="password" defaultValue={password} onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className="border border-black" />

        <button onClick={login}
        className="bg-white">Log in</button>

        <button onClick={()=>{googleLogin()}}>Lgin with google</button>

      </div>

    </div>
  );
}

