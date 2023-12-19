import React,{useState} from 'react';
import axios from 'axios';
import { Link,useNavigate,useLocation } from 'react-router-dom';
import load from "../img/loading.gif"

export default function Submit(props) {
  const {search} = useLocation();
  const navigate = useNavigate();
  const params= new URLSearchParams(search);
  const i=params.get('id');
  const [name, setname] = useState(params.get('name'));
  const [jd, setjd] = useState(params.get('jd'));
  const [loading, setLoading] = useState(false)

  function upd(){
    
    setLoading(true);
    if(i){
      const upd ={
     id:i,
     name:name,
     JD:jd
  }
try{
 // const res = 
 axios.put(`http://localhost:3001/update${i}`, upd)

 // console.log(res)
 navigate("/")
}
catch (error){
 alert("can't update data at this moment")
 console.log(error)
}
}
  }
  const submit = async (e) => {
    
    setLoading(true);
    if(i){
      upd();
      return;
    }
    e.preventDefault();
    const id = e.target.elements.id.value;
    const name = e.target.elements.name.value;
    const jd = e.target.elements.jd.value;
    const content = e.target.elements.content.files[0];
    const u_m= props.email;
    const a_id= props.id;
    const user = {
      u_m:u_m,
      a_id:a_id,
      id: id,
      name: name,
      JD: jd,
      content:content
    };
  
    // console.log(user);
  
    try {
      const res = await axios.post(`http://localhost:3001/create`, user,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }})
      // console.log(res,res.status,res.statusText,res.data.message);
        // console.log(res.data.warn);
        if(res.data.warn==="same"){
          alert("Employee id or name cannot be same kindly change ths")
          return;
        }
      navigate("/")
    } catch (error){
      alert('Hey bro you got Error');
      console.log(error)
    }

    e.target.reset();
  };

  return (
    <>
            {loading ? (
                        <div className="load"> <div><img src={load} /></div></div>
                    ):(<div className="s_in">
            <div className="f_in">
            <p>Submit to backend:</p>
       Email:{props.email}<br/> ID: {props.id}
      <form onSubmit={submit} autoComplete="off" encType="multipart/form-data" >
        <input type="text" value={i} name="id" placeholder="Enter Id here" required/>
        <br/>
        <input type="text" value={name} onChange={(e)=>{setname(e.target.value)}} name="name" required  placeholder="Enter Name here"/>
        <br/>
        <input type="text" name="jd" value={jd} onChange={(e)=>{setjd(e.target.value)}} required placeholder="Enter Job description" />
        <br/>
        <input type="file" name='content' />
        <input type="submit"/>
        
      <Link to={'/'}>View_Record</Link>
      </form>
            </div>
        </div>)}
        </>
  );
};