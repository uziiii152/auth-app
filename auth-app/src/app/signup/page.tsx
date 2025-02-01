"use client";
import React, { useEffect } from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';



function SignUp() {
  const router = useRouter();
  const [user,setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  })


useEffect(()=> {
  if(user.email.length>0 && user.password.length>0 && user.username.length>0){
    setButtonDisabled(false);
  }else{
    setButtonDisabled(true);
  }
}, [user]);

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const onSignUp = async () => {
    try {
      setloading(true)
      const response = axios.post("/api/users/signup",user)
      console.log("signup success",response);
      router.push("/login");
      
    } catch (error:any) { 
      console.log("signup fialed",error.message);
      toast.error(error.message);
    }finally{
      setloading(false);
    }
  }


  const [loading, setloading] = React.useState(false);
  


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h2>{loading ? 'processing': 'signup'}</h2>
      <hr />
      <label htmlFor="username">username</label>
      <input
      className='p-1 border border-gray-300 rounded-md text-red-400'
      id='username'
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
       type="text" 
        placeholder='username'
       />
      <label htmlFor="email">email</label>
      <input
      className='p-1 border border-gray-300 rounded-md '
      id='email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
       type="text" 
        placeholder='email'
       />
      <label htmlFor="password">password</label>
      <input
      className='p-1 border border-gray-300 rounded-md text-black'
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
       type="password" 
        placeholder='password'
       />
       <button
       onClick={onSignUp}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No signup":"Signup here"}</button>
      <Link href='/login'>visit to login</Link>
    </div>
  )
}

export default SignUp