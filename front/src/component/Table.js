
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import load from "../img/loading.gif"
export default function Table(props) {
    const navigate = useNavigate();
    const [data, update] = useState([]);
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState();

    function upd_dta(dta) {
        const p_id = encodeURIComponent(dta.id);
        const p_name = encodeURIComponent(dta.name);
        const p_jd = encodeURIComponent(dta.JD);
        setLoading(true);
        navigate(`/create?id=${p_id}&name=${p_name}&jd=${p_jd}`);
    }

    function del_dta(dta) {
        const p_id = encodeURIComponent(dta.id);
        navigate(`/delete?id=${p_id}`);
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/read")
            .then((res) => {
                update(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    const token = localStorage.getItem("token");
    if (token) {
        axios
            .post("http://localhost:3001/verified", { token })
            .then((res) => {
                const e = res.data.result.is.email;
                setState(e);
            });
    }

    const arr = data.filter((o) => o.u_m === state);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {loading ? (
                        <div className="load"> <div><img src={load} /></div></div>
                    ) : (
                <div className="m_t">
                <div className="i_t">
                        <table>
                            <thead>
                                <tr className="tr">
                                    <th>Admin Email</th>
                                    <th>Admin ID</th>
                                    <th>Employee ID/roll</th>
                                    <th>Employee Name</th>
                                    <th>Employee JD</th>
                                    <th>Picture</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {arr.map((dta) => (
                                    <tr key={dta.id}>
                                        <td>{dta.u_m}</td>
                                        <td>{dta.a_id}</td>
                                        <td>{dta.id}</td>
                                        <td>{dta.name}</td>
                                        <td>{dta.JD}</td>
                                        <td>
                                            <img src={dta.file} alt="img" />
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => upd_dta(dta)} className="lk">Update </button>
                                            <button className="lk" onClick={() => {del_dta(dta);}}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
            </div>
                    )}
              
        </>
    );
}
