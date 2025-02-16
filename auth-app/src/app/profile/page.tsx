"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function page() {
  const Router = useRouter()
  const [data,setData] = useState("nothing")

  const getUserDetails = async () => {
 const res =await axios.get('/api/users/me')
 console.log(res.data);
 setData(res.data.data._id)
 
  }
const logout = async()=> {
  try {
    await axios.get('/api/users/logout')
    toast.success('Logged out successfully')
    Router.push('/login')
  } catch (error:any) {
    console.log(error.message);
    toast.error(error.message)
    
  }
}

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>profile</h1>
        <hr />
        <h2>profile page</h2>
        <h2 className='bg-green-400 p-2 rounded-sm m-2'>{data==="nothing" ? "nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <button
        onClick={logout}
         className='text-white bg-blue-500 hover:bg-blue-700 rounded-md m-2 p-3'>Logout</button>
        <button
        onClick={getUserDetails}
         className='text-white bg-green-500 hover:bg-blue-700 rounded-md m-2 p-3 mt-2'>GetDetails</button>
    </div>
  )
}

export default page