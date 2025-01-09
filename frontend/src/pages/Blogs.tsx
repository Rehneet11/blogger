import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks'
import Skeleton from '../components/Skeleton';

function Blogs() {
    const{loading,blogs}=useBlogs();
    if(loading){
        return( 
            <>
            <AppBar/>
            <div className='bg-black  flex justify-center flex-col'>
                <Skeleton />
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
            </div>
            </>
        )
    }
  return (
    <>
        <AppBar/>
        <div className='bg-black h-fit w-full flex justify-center'>
            <div>
                {blogs.map(blog=><BlogCard 
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title} 
                    content={blog.content}
                    publishedDate='7 January 2025'
                />)}
            </div>
        </div>
    </>
    
  )
}

export default Blogs