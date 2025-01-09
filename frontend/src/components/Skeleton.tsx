import React from 'react'

function Skeleton() {
  return (
    <div className='bg-black flex justify-center'>
        <div className='border-b border-cyan-700 p-4 w-screen max-w-screen-md cursor-pointer'>
                <div className='flex'>
                    <div className='flex justify-center flex-col'>
                        <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className='text-cyan-100 flex justify-center flex-col pl-3'>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className='text-white pl-2 flex justify-center font-thin flex-col text-[6px]'>&#9679;</div>
                    <div className='text-white flex justify-center flex-col pl-2 font-thin'>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                </div>
                <div className='text-white text-xl font-semibold'>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className='text-white font-light'>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
                <div className='text-slate-400 text-sm font-thin'>
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
        </div>
        
    </div>
  )
}

export default Skeleton