import React,{useState} from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import load from "../img/loading.gif"
export default function Nav() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false)
  const sout =()=>{
    
    setLoading(true)
    setTimeout(() => {
    localStorage.removeItem("token")
    navigate("/login")
    }, 500)
    }
  return (
    <>{loading ? (
      <div className="load sout"> <div><img src={load} /></div></div>
  ) :(
    <div className='navbar'>
        <div className='lnk' >
      <Link to={'/'}>Home</Link>
      </div>
      <div className='lnk'>
      <Link to={'/create'}>Create</Link>
      </div>
      <div className='lnk'><Link to={'/update'}>Update</Link>
    </div>
    <div className='lnk'><Link to={'/delete'}>Delete</Link>
    </div>
    <div className='lnk'><button  onClick={()=>{sout()}}>Signout</button>
   
   </div>
    </div>
    )}<Outlet/>
    </> )
}
