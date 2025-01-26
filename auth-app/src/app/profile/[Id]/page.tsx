import React from 'react'

function Userprofile({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>profile</h1>
        <hr />
        <h2 className='text-4xl'>profile page <span className='p-2 rounded bg-orange-500 m-2 text-black'>{params.Id}</span> </h2>
        
    </div>
  )
}

export default Userprofile