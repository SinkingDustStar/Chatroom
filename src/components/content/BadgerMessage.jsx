import React from "react"
import { Card , Button} from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useContext } from "react";
function BadgerMessage(props) {

    const dt = new Date(props.created);
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext)

    // console.log(props)
    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        {/*  increased the line height of the <sub> element, providing more space above and below the text inside it */}
        <sub style={{ lineHeight: '1.5' }}>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            loginStatus && props.poster === loginStatus? 
                <Button onClick={() => props.deleteItem(props)}>Delete Post</Button>
            :
            <></>
        }
    </Card>
}

export default BadgerMessage;