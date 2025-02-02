"use client";
import React, { useEffect } from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { set } from 'mongoose';



function Login() {
  const router = useRouter();
  const [user,setUser] = React.useState({
    email: '',
    password: '',
  })
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

const [loading, setloading] = React.useState(false);

  const onLogin = async () => {
    try {
      setloading(true)
      const response = await axios.post("/api/users/login",user)

      console.log("login success",response.data);

      toast.success(response.data.message);

      router.push("/profile");
    } catch (error:any) {
      console.log("login failed",error.message);
      toast.error(error.message);
    }finally{
      setloading(false);
    }

  }

useEffect(()=> {
  if(user.email.length>0 && user.password.length>0){
    setButtonDisabled(false);
  }else{
    setButtonDisabled(true);
  }

}, [user]);


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h2>{loading ? "processing": "Login"}</h2>

      <hr />
      <label htmlFor="email">email</label>
      <input
      className='p-1 border border-gray-300 rounded-md  text-black'
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
       type="text" 
        placeholder='email'
       />
      <label htmlFor="password">password</label>
      <input
      className='p-1 border border-gray-300 rounded-md  text-black'
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
       type="text" 
        placeholder='password'
       />
       <button
       onClick={onLogin}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Login here</button>
      <Link href='/signup'>visit to SignUp</Link>
    </div>
  )
}

export default Login