import React, {useState, useEffect} from "react";
import {Form,Button,Offcanvas} from 'react-bootstrap'
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import usePromise from "react-promise";
import {libraryMenu, userMenu} from '../menuConfig'
import CategoryCard from "./CategoryCard";
import AuthorsObj from "./AuthorsObj";

function AuthorsPage({token}){
    const [authors, setAuthors] = useState(false)
    const [validated, setValidated] = useState(false);
    const [content, setContent] = useState([]);
    const [show, setShow] = useState(false);
    const [authorState, setAuthorState] = useState({
        authorFirstname: "",
        authorSecondname: ""
    })

    useEffect( () => {
        fetch("http://localhost:8090/api/books/allAvtors",{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': token
        }
        })
        .then(r => r.json())
        .then(r => {
            setAuthors(r);
        })
    })

    const handleSubmitEdit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            alert("Не валідно заповнені поля")
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else{
            event.preventDefault();
             fetch("http://localhost:8090/api/books/createAuthor",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': token
                },
                body: JSON.stringify(authorState)
            })
            .then(data => {
                if(data.status != 200){
                    alert(data.body.message)
                }
                else{
                    alert("Автора створено")
                    window.location.reload()
                }
            })
        }
    }

    const handleClose = () => {
        setContent([]);
        setShow(false)
    };

    const handleShowAdd = () => {
        setContent([
            <Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Ім'я</Form.Label>
                    <Form.Control  required type="text" pattern="^[A-Z][a-z]*$" placeholder="Ім'я" onChange={e => authorState.authorFirstname = e.target.value}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Прізвище</Form.Label>
                    <Form.Control  required type="text" pattern="^[A-Z][a-z]*$" placeholder="Ім'я" onChange={e => authorState.authorSecondname = e.target.value}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Додати
                </Button>
            </Form>
        ])
        setShow(true);
    };

    if(authors){
        const author_arr = []
        for(let a of authors){
            author_arr.push(<AuthorsObj token={token} author={a}/>)
        }

        if(content){
            return(
                <div>
                    <Navigation data={libraryMenu}/>
                    <h3>Робота з авторами</h3>
                    <Button variant="primary" className="mb-3" onClick={handleShowAdd}>Додати автора</Button>
                    <div className="d-flex flex-wrap">
                        {author_arr}
                    </div>
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Створення автора</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            {content}
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            )
        }
        return(
            <div>
                <Navigation data={libraryMenu}/>
                <h3>Робота з авторами</h3>
                <Button variant="primary" className="mb-3" onClick={handleShowAdd}>Додати автора</Button>
                <div className="d-flex flex-wrap">
                    {author_arr}
                </div>
            </div>
        )
    }
    return(
        <div>
            <Navigation data={libraryMenu}/>
            <h3>Робота з авторами</h3>
            <div className="d-flex flex-wrap">
            </div>
        </div>
    )
}
    
    
export default AuthorsPage;
