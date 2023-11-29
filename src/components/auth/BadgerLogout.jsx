
import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            console.log(json)
            sessionStorage.setItem('username', JSON.stringify(""))
            setLoginStatus("")
            // Maybe you need to do something here?
            navigate('/')
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
