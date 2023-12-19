import React from 'react';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import { useEffect } from 'react';
export default function Login() {
    const navigate = useNavigate();
    const s_in = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.elements.email.value,
            pass: e.target.elements.pass.value
        }
            const res = await axios.post('http://localhost:3001/login', data);
            // console.log(res.data)
            const token = res.data.token;
            if (!token) {
                alert('email or password is wrong conot generate token');
                return;
            }
            localStorage.setItem("token",token);
            navigate('/');
    }
  
    useEffect(()=>{
        const a=localStorage.getItem("token")
        if(a){
        navigate("/");
    }
    },[])
  
    return (
        <div className="s_in">
            <div className="f_in">
                <h2>SignIn</h2>
                <form onSubmit={s_in} autoComplete='off'>
                    <input type="text" name='email' placeholder="Enter Your Email" />
                    <input type="password" name='pass' placeholder="Enter Your Password" />
                    <button type="submit" className="btn">LogIn</button>
                </form>
                want to create account<Link to={"/signup"}>click here.</Link>
            </div>
        </div>
    )
}
