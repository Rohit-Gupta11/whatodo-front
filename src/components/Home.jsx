import React from "react";
import {Link} from "react-router-dom";
import "./main.css";
import Kids from "./kids.png";

const Home = () => {
    return(
        <>
        <div className="home container">
            <img src={Kids} alt="something" className="kids"/>
            <div className="hero-text">
                <p className="p1">Making a todo-list is always a <br/>great idea.</p>
                <p className="p2">Don’t waste time anymore!<br/>Make your todo-list here</p>
            </div>
        </div>
        <div className="hero-btn-container">
        <Link to="/register" className="hero-btn-home">Let's do</Link>
        </div>
        </>
    );
};

export default Home;