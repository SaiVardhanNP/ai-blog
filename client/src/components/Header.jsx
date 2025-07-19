import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className=' mx-8 sm:mx-16 md:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
        <p>New: AI feature integrated</p>
        <img src={assets.star_icon} alt="" className='w-2.5' />
      </div>
      <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16'>Your own <span className='text-primary'>blogging</span> platform.</h1>
      <p className='max-sm:text-xs my-6 sm:my-8 max-w-2xl m-auto  text-gray-500'>This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts right here.</p>
      <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50 ' alt="" />
      </div>
    </div>
  )
}

export default Header
