import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signout() {
    const navigate = useNavigate();
    const s_out = ()=>{
       localStorage.removeItem("token")
       navigate("/login")
    }
    const a = localStorage.getItem("token")
    if(!a){
      navigate('/login')
    }
  return (
    <div>
        <br/><br/><br/><br/>
        <button onClick={s_out}>signout</button></div>
  )
}
