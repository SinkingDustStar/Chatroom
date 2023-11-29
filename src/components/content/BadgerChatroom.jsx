import React, { useEffect, useState, useRef } from "react"
import BadgerMessage from "./BadgerMessage"
import { Container,Row ,Col, Pagination, Form, Button} from "react-bootstrap";


export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const title = useRef()
    const content = useRef()
    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=1`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            console.log(json.messages.length)
            setPage(1)
            // console.log(json.messages)
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props]);

    const createPost = ()=>{
        if(JSON.parse(sessionStorage.getItem('username')) === ""){
            alert("You must be logged in to post!")
        }else if(title.current.value === "" || content.current.value === ""){
            alert("You must provide both a title and content!")
        }else{
            // console.log(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`)
            fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`,{
                method : "POST",
                credentials : "include",
                headers : {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({
                    "title" : title.current.value,
                    "content" : content.current.value
                })
            }).then(res => {
                fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=1`, {
                    headers: {
                        "X-CS571-ID": CS571.getBadgerId()
                    }
                }).then(res => res.json()).then(json => {
                    setMessages(json.messages)                  
                })
                alert("Successfully posted!")
            })
        }
    }

    useEffect(()=>{
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)                  
        })
    },[page])

    const deleteItem = (item) => {
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${item.id}`,{
            method : "DELETE",
            credentials : "include",
            headers : {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res =>{
            fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${item.chatroom}&page=1`, {
                    headers: {
                        "X-CS571-ID": CS571.getBadgerId()
                    }
                }).then(res => res.json())
                .then(json => {
                    setMessages(json.messages) 
                    title.current.value = ""
                    content.current.value = ""
                    alert("Successfully deleted the post!")                 
                })
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */
            <>
            <Form.Label htmlFor="Title">Post Title</Form.Label>
            <Form.Control id="Title" ref = {title}></Form.Control>
            <Form.Label htmlFor="Content">Post Content</Form.Label>
            <Form.Control id="Content" ref = {content}></Form.Control>
            <Button onClick={createPost}>create Post</Button>
            </>
        }
        <hr/>
        {
            messages.length ?
                <>
                    <Container fluid>
                        <Row>
                    {
                        /* TODO: Complete displaying of messages. */
                        
                        messages
                            .map(message => <Col key = {message.id} xs = {12} sm = {6} md = {4} lg = {3} xl = {2}>
                                 <BadgerMessage key ={message.id} deleteItem={deleteItem} {...message} /> </Col>)
                        
                    }
                        </Row>
                    </Container>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                    
                </>
        }
        <Pagination>
            <Pagination.Item active={page === 1} onClick={() => setPage(1)}>1</Pagination.Item>
            <Pagination.Item active={page === 2} onClick={() => setPage(2)}>2</Pagination.Item>
            <Pagination.Item active={page === 3} onClick={() => setPage(3)}>3</Pagination.Item>
            <Pagination.Item active={page === 4} onClick={() => setPage(4)}>4</Pagination.Item>
        </Pagination>
    </>
}
