import React from 'react'
import AppBar from './AppBar'
import { Blog } from '../hooks'
import { Avatar } from './BlogCard'

function BigBlog({blog}:{blog:Blog}) {
  return (
    <div className='bg-black h-screen w-full'>
        <AppBar/>
        <div className='flex justify-around'>
            <div className='grid grid-cols-12 px-10 pt-20 max-w-screen-3xl '>
                <div className='col-span-8 text-white pr-40'>
                    <div className='text-5xl text-cyan-200 pb-2 font-bold'>
                        {blog.title}
                    </div>
                    <div className='pb-8 text-slate-500'>Posted On 7th December</div>
                    <div className='text-lg text-white'>
                        {blog.content}
                    </div>
                </div>
                <div className='col-span-4 '>
                    <div className='text-xl font-bold text-white pb-4'>
                        Author
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col justify-center pr-4'>
                            <Avatar name={blog.author.name || "Anonymous"}/>
                        </div>
                        <div>
                            <div className='text-cyan-200 text-3xl font-semibold'>
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className='text-slate-500 text-lg'>
                                Random Text Phrase
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BigBlog