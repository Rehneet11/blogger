import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

function AppBar() {
  return (
    <div className="border-b border-cyan-800 flex justify-between px-10 py-5 bg-black">
        <Link  to={'/blogs'} className="text-cyan-200 text-2xl font-semibold cursor-pointer">
            Blogger
        </Link>
        <div>
          <Link to={'/publish'}>
            <button type="button" className="focus:outline-none text-cyan-950 bg-cyan-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mx-4 mb-2 "> Create New Blog</button>
          </Link>
          <Avatar name="Rehneet Singh"/>
        </div>
        
    </div>
  )
}

export default AppBar