import { useContext, useRef, useState } from "react";
import React from 'react';
import { Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from "react-router";


export default function BadgerLogin() {

    // TODO Create the login component.
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)
    const login = () =>{
        if(username.current.value === "" || password.current.value === ""){
            alert("You must provide both a username and password!")
        }else{
            fetch('https://cs571.org/api/f23/hw6/login',{
                method : "POST",
                credentials : "include",
                headers:{
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    "username" : username.current.value,
                    "password" : password.current.value
                })
            }).then(res =>{
                if(res.status === 401){
                    alert("Incorrect username or password!")
                }          
                sessionStorage.setItem('username', JSON.stringify(username.current.value))
                setLoginStatus(username.current.value)
                navigate('/')
                alert("login successfully")
            })
        }

    }

    return <>
        <h1>Login</h1>
        <Form.Label htmlFor='username'>username</Form.Label>
        <Form.Control id='username' ref={username}></Form.Control>
        <Form.Label htmlFor='password'>password</Form.Label>
        <Form.Control id='password' ref={password} type="password"></Form.Control>
        <Button onClick={login}>Login</Button>
    </>
}
