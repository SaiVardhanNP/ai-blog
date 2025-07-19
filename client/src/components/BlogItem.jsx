import React from 'react'
import { useNavigate } from 'react-router-dom';


const BlogItem = ({blog}) => {
    const {title,description,category,image,_id}=blog;
    const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/blog/${_id}`)} className='overflow-hidden shadow hover:scale-105 hover:shadow-primary/25 duration-300 cursor-pointer w-full rounded-lg'>
        <img src={image} className='aspect-video' />
        <span className='bg-primary/20 ml-5 mt-4 inline-block text-primary py-1 px-3 text-xs w-20 rounded-full'>{category}</span>
        <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html":description.slice(0,80)}}></p>
        </div>
    </div>
  )
}

export default BlogItem
