import React,{useState,useEffect} from 'react';
import axios from 'axios';
// import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Submit from './Submit'
// import Table from './Table';
export default function Verify() {

  const navigate = useNavigate();
  const [data, update] = useState([]);
   const [state,setstate]=useState();

  const token=localStorage.getItem("token");
  // console.log({token:token})
  useEffect(()=>{
    const a=localStorage.getItem("token")
    if(!a){
    navigate("/login");
}
},[])
    axios.post('http://localhost:3001/verified', {token}).then(res => {
      // console.log(res,res.data.result.is.email)
      const e=res.data.result.is.email;
  
        setstate(e)
    })
      .catch(error => {
        console.log(error)
      })
      useEffect(() => {
       axios.get("http://localhost:3001/super")
        .then((res) => update(res.data.persons))
        .catch((err) => console.log(err));
    }, [])
 

  // console.log(data,data.length,state)
  for(let i= 0 ; i< data.length; i++){
    if (data[i].email===state){
      // console.log(data[i]._id)
      update(data[i]._id)
    }
  }
  // console.log(state,data)
    // const a=admin.find(ad => ad.email === state)._id;
    // console.log(a);
    // const admin_email = admin.find(ad => ad.email === "salman@iqbal")
    //  console.log(admin_email)

  return (
    <div className="fl">
  <p>Only autherized person can visit here </p>
  
  <Submit email={state} id={data} />
    </div>
  )
}
