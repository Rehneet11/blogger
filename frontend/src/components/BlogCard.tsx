import { Link } from 'react-router-dom'

interface BlogCardprops{
    authorName:string
    title:string
    content:string
    publishedDate:string
    id:string
}

function BlogCard({
    authorName,title,content,publishedDate,id
}:BlogCardprops) {
  return (
    <Link to={`/blog/${id}`}>
    <div className='border-b border-cyan-700 p-4  w-screen max-w-screen-md cursor-pointer'>
        <div className='flex'>
            <div className='flex justify-center flex-col'>
                <Avatar name={authorName}/> 
            </div>
            <div className='text-cyan-100 flex justify-center flex-col pl-3'>
                {authorName}
            </div>
            <div className='text-white pl-2 flex justify-center font-thin flex-col text-[6px]'>&#9679;</div>
            <div className='text-white flex justify-center flex-col pl-2 font-thin'>
                {publishedDate}
            </div>
        </div>
        <div className='text-white text-xl font-semibold'>
            {title}
        </div>
        <div className='text-white font-light'>
            {content.slice(0,100)} {content.length > 100 ? "....":null}
        </div>
        <div className='text-slate-400 text-sm font-thin'>
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
    </Link>
  )
}

 export function Avatar({name}:{name:string}){
    return <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-cyan-100 rounded-full border border-cyan-600 ">
    <span className="font-medium text-slate-900">{name[0]}</span>
    </div>
}

export default BlogCard