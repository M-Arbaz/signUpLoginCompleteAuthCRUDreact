import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export default function Signup() {
  const navigate =useNavigate();
  useEffect(()=>{
    const a=localStorage.getItem("token")
    if(a){
    navigate("/");
}
},[])
  const s_up= async (e)=>{
    e.preventDefault()
   const name=e.target.elements.name.value;
   const email=e.target.elements.email.value;
   const pass=e.target.elements.pass.value;
   const c_pass=e.target.elements.c_pass.value;   
   const data={
      name:name,
      email:email,
      pass:pass,
      c_pass:c_pass
   }
   if(data.pass!==data.c_pass){
     alert('password and confirm password must be same')
     return;
   }
   // console.log(data);
   
   const res = await axios.post('http://localhost:3001/signup',data)
   // console.log(res.data)
   if (res.data==="user alredy exsist"){
     alert(`usr alredy exsist please change name:${data.name} or email:${data.email}`);
     return;
   }
   alert('user created succesful')
   navigate('/login')
   }

  return (
    <div className="con">
    <div className="crd">
        <h2>Come and Join our Community</h2>
        <br/>
        <br/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, ipsam officia! Nemo fugit soluta sequi, rem
        <br/>
        <br/>
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat necessitatibus aspernatur ea mollitia voluptatibus consequuntur.
    </p>                
    </div>
    <div className="crd" >
        <h2>Join Us Now</h2>
        <form onSubmit={s_up} autoComplete="off">
         <input type="text" placeholder="Enter Your Name" name='name' required/>
         <input type="email" name='email' placeholder="Enter your Email"required/>
         <input type="password" placeholder="Enter Password" name='pass' required/>
         <input type="password" placeholder="Confirm Password" name='c_pass' required/>
         <button className="btn" type="submit">SignUp</button>
        </form>
    </div>
</div>
  )
}
