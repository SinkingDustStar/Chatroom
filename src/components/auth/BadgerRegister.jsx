import React, { useState,useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router";

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeat, setRepeat]  = useState("");
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)
    const createRegister = ()=>{
        if(username === "" || password === ""){
            alert("You must provide both a username and password!")
        }else if(password != repeat){
            alert("Your passwords do not match!")
        }else{
            fetch('https://cs571.org/api/f23/hw6/register',{
                method : "POST",
                credentials : "include",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    "username" : username,
                    "password" : password
                })
            }).then(res =>{
                // console.log(res.status)
                if(res.status === 409){
                    alert("That username has already been taken!")
                }else{
                    sessionStorage.setItem('username', JSON.stringify(username))
                    setLoginStatus(username)
                    navigate('/')
                    alert("the registration was successful")
                }               
            })
        }
    }

    return <>
        <h1>Register</h1>
        <Form.Label htmlFor='username'>username</Form.Label>
        <Form.Control id='username' value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
        <Form.Label htmlFor='password'>password</Form.Label>
        <Form.Control id='password' value={password} type="password" onChange={(e) => setPassword(e.target.value)}></Form.Control>
        <Form.Label htmlFor='repeat'>repeat password</Form.Label>
        <Form.Control id='repeat' value={repeat} type="password" onChange={(e) => setRepeat(e.target.value)}></Form.Control>
        <Button onClick={createRegister}>Register</Button>
    </>
}
