import React from 'react'

const Search = () => {
  return (
    
    <div className='mx-auto flex p-2 justify-between max-w-lg mx-sm:scale-75  border border-gray-300 bg-white rounded overflow-hidden'>
      <input placeholder='Search blogs' type="text" className='outline-none text-xl pl-4 w-full' />
      <button className='bg-primary text-white rounded-md px-6 w-35 py-3 cursor-pointer'>Search</button>
    </div>
  )
}

export default Search
