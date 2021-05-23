import React, { useEffect, useState } from "react";
import "./todo.css";
import Axios from "axios";
import TodoIn from "./TodoIn";
import { useHistory } from "react-router-dom";

const List = (props) => {
    const {
        todoId,
        title,
        description,
        setIsloaded
    } = props;

    function deleteTodo() {
        Axios.delete(`https://whattodo-back.herokuapp.com/todo/todo-delete/${todoId}`)
        setIsloaded(true);
    }

    return (
        <div className="todo-list">
            <div className="sub-list">
            <label>{title}</label>
            <p>{description}</p>
            </div>
            <button onClick={deleteTodo} >Delete</button>
        </div>
    );
}

const Logout = () => {
    let history = useHistory();
    function logOut(){
        Axios.delete("https://whattodo-back.herokuapp.com/user/login").then((response) => {
            history.push("/");
        });
    }
    return(
        <input onClick={logOut} type="submit" value="Logout" />
    )
}

const TodoWindow = () => {
    const [user, setUser] = useState();
    const [data, setData] = useState([]);

    let history = useHistory();

    const [isloaded, setIsloaded] = useState(false);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("https://whattodo-back.herokuapp.com/user/login").then((response) => {
            if (response.data.loggedIn === true) {
                setUser(response.data.user._id);
                document.title = "Welcome!";
            } else {
                history.push('/register');
            }
        });
    }, [history]);

    useEffect(() => {
        Axios.get(`https://whattodo-back.herokuapp.com/todo/todo-list?userId=${user}`).then((response) => {
            setData(response.data);
            setIsloaded(false);
        })
    }, [user, isloaded]);

    return (
        <div className="container con-dash">
            <div className="dashboard">
                <div className="subdash">
                <h1 className="headDash">DASHBOARD</h1>
                <Logout/>
                </div>
                {
                    data &&
                    data.map((item) => {
                        return <List key={item._id} setIsloaded={setIsloaded} todoId={item._id} title={item.title} description={item.description} />
                    })
                }
            </div>
            <TodoIn isloaded={isloaded} setIsloaded={setIsloaded} userId={user} />
        </div>
    );
};

export default TodoWindow;