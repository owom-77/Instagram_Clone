import React from 'react'
import { Link } from 'react-router-dom'
import imageStorage from '../appwrite/imagedatabase'

export default function PostCard({$id, postImage,title}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={imageStorage.getFilePreview(postImage)} alt={title}
                className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
  
}
