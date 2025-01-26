"use client";
import React from 'react'
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Axios} from 'axios';



function SignUp() {
  const [user,setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  })

  const onSignUp = async () => {

  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h2>SignUp</h2>
      <hr />
      <label htmlFor="username">username</label>
      <input
      className='p-1 border border-gray-300 rounded-md '
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
      className='p-1 border border-gray-300 rounded-md '
      id='password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
       type="text" 
        placeholder='password'
       />
       <button
       onClick={onSignUp}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>SignUp here</button>
      <Link href='/login'>visit to login</Link>
    </div>
  )
}

export default SignUp