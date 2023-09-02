import { useState } from 'react'

function App() {
  

  return (
   <div className='w-full h-screen bg-black flex justify-center items-center'>
    <div className=' bg-gray-700 max-w-md w-full px-4 py-2 rounded-md'>
      <div className=''>
        <h1 className='text-center text-3xl text-white mt-3 mb-6'>Password Generator</h1>
        <input type="text" className='px-2 py-1' />
        <button className='bg-blue-600 text-white px-2 py-1'>Copy</button>
      </div>
    </div>
   </div>
  )
}

export default App
