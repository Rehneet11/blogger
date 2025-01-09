import React, { ChangeEvent, useState } from 'react'
import AppBar from '../components/AppBar'
import axios from 'axios'
import { BACKENDURL } from '../config'
import { useNavigate } from 'react-router-dom'

function Publish() {
    const [title,setTitle]=useState("")
    const navigate=useNavigate()
    const [content,setContent]=useState("")
  return (
    <div className='h-screen bg-black w-full'>
        <AppBar/>
        <div className='flex justify-center pt-10'>
            <div className='max-w-screen-lg w-full'>
                <label className='text-xl text-white font-semibold'>Enter Title</label>
                <input onChange={(e)=>{setTitle(e.target.value)}} className="bg-slate-950 border border-cyan-300 text-cyan-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 mb-6 " placeholder="Title"/>
                <TextEditor onChange={(e)=>{setContent(e.target.value)}}/>
                <button onClick={async ()=>{
                    const response = await axios.post(`${BACKENDURL}/api/v1/blog`,{
                        title,
                        content
                    },{headers:{
                        "Authorization":localStorage.getItem("token")
                    }})
                    navigate(`/blog/${response.data.id}`)
                }} className="focus:outline-none text-cyan-950 bg-cyan-400 hover:bg-cyan-900 hover:text-cyan-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-2">
                    Publish
                </button>
            </div>
        </div>
    </div>
  )
}


function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <form>
        <label className="text-xl text-white font-semibold">Your Message</label>
        <textarea onChange={onChange} rows={12} className="bg-slate-950 border border-cyan-300 text-cyan-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 mb-6" placeholder="Write your thoughts here..."></textarea>
    </form>
}

export default Publish