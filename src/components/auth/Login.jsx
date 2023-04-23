import React, { useEffect } from "react";
import "./auth.css";
import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
    const api_key = "https://api-whattodo.onrender.com/user/login";

    const [usernameLog, setUsernameLog] = useState("");
    const [passwordLog, setPasswordLog] = useState("");

    let history = useHistory();

    Axios.defaults.withCredentials = true;

    const loginUser = () => {
        if (usernameLog && passwordLog) {
            Axios.post(api_key, {
                username: usernameLog,
                password: passwordLog
            }).then((response) => {
                console.log('login', response)
                if (response.status === 200) {
                    history.push("/todo");
                }
            });
        }else{
            alert('please enter valid credentials')
        }
    }

    // if user already logined, push to dashboard page
    useEffect(() => {
        Axios.get("https://api-whattodo.onrender.com/user/login").then((response) => {
            if (response.data.loggedIn === true) {
                history.push("/todo");
            }
        });
    }, [history]);

    // for setting document title 
    useEffect(() => {
        document.title = "Login";
    }, []);

    return (
        <div className="container auth">
            <h1 className="heading">Login</h1>
            <div className="sub-details-con">
                <label>Username</label>
                <input type="text" onChange={e => setUsernameLog(e.target.value)} />
            </div>
            <div className="sub-details-con">
                <label>Password</label>
                <input type="text" onChange={e => setPasswordLog(e.target.value)} />
            </div>
            <div className="btn-con">
                <button onClick={loginUser} className="auth-btn mg-bt" >Login</button>
            </div>
        </div>
    );
};

export default Login;