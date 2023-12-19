import React,{useEffect,useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Update(){
    const {search} = useLocation();
  const params= new URLSearchParams(search);
    const id=params.get('id');
  const [name, setname] = useState(params.get('name'));
  const [jd, setjd] = useState(params.get('jd'));
  // console.log(id,name,jd)
   const [data, update] = useState([]);
   const [state,setstate]=useState();
   useEffect(() => {
       axios.get("http://localhost:3001/read")
         .then((res) => update(res.data))
         .catch((err) => console.log(err));
     }, []);
     const token = localStorage.getItem("token")
     axios.post('http://localhost:3001/verified', {token}).then(res => {
         // console.log(res,res.data.result.is.email)
         const e=res.data.result.is.email
           setstate(e)
       })
       // console.log(arr.map(dta=>dta.id))
     const arr= data.filter(o => o.u_m === state)
     const all = arr.map(dta=>dta.id)
   const navigate = useNavigate()
   const update1= async (e)=>{
      e.preventDefault();
       const id = e.target.elements.id.value;
       const name = e.target.elements.name.value;
       const jd = e.target.elements.jd.value;
      //  console.log(id,name,jd)
       const upd ={
          id:id,
          name:name,
          JD:jd
       }
       const find_id = all.findIndex(a=>a===id)
        console.log(find_id)
       //     console.log(del_id);
       if(find_id===-1){
           alert("this id record doesnot belongs to you")
           return;
       }
       try{
          // const res = 
          await axios.put(`http://localhost:3001/update${id}`, upd)
  
          // console.log(res)
          alert("Data updated succesful.")
          navigate("/")
       }
       catch (error){
          alert("can't update data at this moment")
          console.log(error)
       }
       e.target.reset();
  }
  useEffect(()=>{
    const a=localStorage.getItem("token")
    if(!a){
    navigate("/login");
}
},[])
    return(
        <>       
        <div className="s_in">
        <div className="f_in">
        <p>Update data on base of id:</p>
        <form onSubmit={update1}  autoComplete="off">
           
          <input type='text' name='id' value={id}   placeholder="Enter id here" required/>
          <br/>
          <input type='text' name='name' value={name} onChange={(e)=>{setname(e.target.value)}}  placeholder="Enter name here" required/>
          <br/>
          <input type='text' name='jd' value={jd} onChange={(e)=>{setjd(e.target.value)}} placeholder="Enter job description here" required/>
          <br/>
          {/* it will be done soon */}
          {/* <input type='file' name='content'/> */}
          
        <input type='submit' value={"update"}/>
        </form>
        </div></div>
        </>
    )
}
