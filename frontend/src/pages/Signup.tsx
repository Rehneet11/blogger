import Quote from '../components/Quote'
import Auth from '../components/Auth'

function Signup() {
  return (
    <div>
        <div className='grid lg:grid-cols-2'>
            <div>
                <Auth type='signup'/>
            </div>
            <div className='hidden lg:block'>
                <Quote/>
            </div>
        </div>
    </div>
  )
}

export default Signup