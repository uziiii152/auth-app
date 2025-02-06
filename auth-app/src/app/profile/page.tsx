"use client"

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function page() {
  const Router = useRouter()
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
        <button
        onClick={logout}
         className='text-white bg-blue-500 hover:bg-blue-700 rounded-md m-2 p-3'>Logout</button>
    </div>
  )
}

export default page